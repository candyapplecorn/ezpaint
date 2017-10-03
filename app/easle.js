import { interpolateBetweenPoints } from './util';
import TOOLS from './tools';

const MOUSE = {
  x: 0, y: 0, isDown: false
};

class Easle {
    constructor({ canvas, colorPicker, toolPicker }){
      this.canvas = canvas;
      this.resize();

      this.configureContainer(canvas)

      toolPicker.subscribers.push(tp => (this.toolType = tp.value))
      this.toolType = toolPicker.value
      colorPicker.subscribers.push(cp => (this.color = cp.value))
      this.color = colorPicker.value

      this.radius = 10;
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
      const { clientX: x, clientY: y } = e
      const { canvas, color, tool, radius, brushType, toolType } = this
      tool.points.push({x, y})

      switch (toolType){
        case "circle":
          if (tool.points.length < 2)
            tool[brushType]({ canvas, color, x, y, radius })
          else {
            const ipoints = [];

            tool.points.slice(1).forEach((p, i, a) => {
              ipoints.push(
              ... interpolateBetweenPoints(tool.points[i], p)
            )})

            ipoints.forEach(({x, y}) => tool[brushType]({canvas, color, x, y, radius }))

            tool.points.shift()
          }
      }
    }

    clear(){
      const context = this.canvas.getContext('2d')
      context.fillStyle = "white"
      context.fillRect(0, 0, this.canvas.width, this.canvas.height)
      context.fillStyle = this.color
    }

    resize(){
      this.canvas.width = this.canvas.clientWidth;
      this.canvas.height = window.innerHeight * 3 / 5;
    }
}

export default Easle;
