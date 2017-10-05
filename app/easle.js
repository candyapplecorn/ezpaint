import { interpolateBetweenPoints } from './util';
import TOOLS from './tools';

const MOUSE = {
  x: 0, y: 0, isDown: false
};

class Easle {
    constructor({ canvas, colorPicker, toolPicker, slider }){
      this.canvas = canvas;
      this.resize();

      this.configureContainer(canvas)

      toolPicker.subscribers.push(tp => (this.toolType = tp.value))
      this.toolType = toolPicker.value
      colorPicker.subscribers.push(cp => (this.color = cp.value))
      this.color = colorPicker.value
      slider.subscribers.push(sl => (this.radius = Number(sl.value)))
      this.radius = Number(slider.value);

      this.tool = TOOLS//.paintbrush
      this.mouse = MOUSE
      this.brushType = "circle"
    }

    configureContainer(canvas){
      canvas.addEventListener('mousedown', e => {
        this.mouse.isDown = true;
        this.handleMouseMove(e);
      });

      ['mouseup', 'mouseleave', 'blur'].forEach(ev =>
        document.addEventListener(ev, _ => {
          this.mouse.isDown = false;
          this.tool.points = [];
        })
      )

      window.addEventListener('resize', this.resize)

      canvas.addEventListener('mousemove', e => {
        if (this.mouse.isDown)
          this.handleMouseMove(e)
      });
    }

    handleMouseMove(e){
      const { layerX: x, layerY: y } = e
      // debugger
      const { canvas, color, tool, radius, brushType, toolType } = this
      tool.points.push({x, y})

      switch (toolType){
        case "square":
        case "circle":
        case "star":
          if (tool.points.length < 2)
            tool[toolType]({ canvas, color, x, y,
                      radius, spikes: 5,
                      outerRadius: radius * 2, innerRadius: radius })
          else {
            const ipoints = [];

            tool.points.slice(1).forEach((p, i, a) => {
              ipoints.push(
              ... interpolateBetweenPoints(tool.points[i], p)
            )})

            ipoints.forEach(({x, y}) => tool[toolType]({ canvas, color, x, y,
                      radius, spikes: 5, outerRadius: radius * 2, innerRadius: radius }))

            tool.points.shift()
          }
          break;
        case "bucket":
          tool.bucketPix({ canvas, color, x: e.layerX, y: e.layerY });
          break;
        case "spray":
          tool.spray({ canvas, color, x, y, radius });
          break;
      }
    }

    clear(){
      const context = this.canvas.getContext('2d')
      context.fillStyle = "white"
      context.fillRect(0, 0, this.canvas.width, this.canvas.height)
      context.fillStyle = this.color
    }

    resize(){
      // this.canvas.width = this.canvas.clientWidth;
      // this.canvas.height = window.innerHeight * 3 / 5;
      this.canvas.width = this.canvas.clientWidth;
      this.canvas.height = window.innerHeight;
    }
}

export default Easle;
