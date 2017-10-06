import { interpolateBetweenPoints, toggleCursor } from './util';
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
      ['touchstart', 'mousedown'].forEach(ev =>
        canvas.addEventListener(ev, e => {
          this.mouse.isDown = true;
          this.handleMouseMove(e);

          if (this.interval == undefined)
            this.interval = window.setInterval(
              this.tool.spray.bind(this, {
                canvas: this.canvas, color: this.color,
                x: e.layerX, y: e.layerY, radius: this.radius
              }),
              200
            );
        }));

      ['mouseup', 'mouseleave', 'blur', 'touchend'].forEach(ev =>
        document.addEventListener(ev, _ => {
          this.mouse.isDown = false;
          this.tool.points = [];

           this.interval && window.clearInterval(this.interval)
           delete this.interval
        }));

      window.addEventListener('resize', this.resize.bind(this));

      ['mousemove', 'touchmove'].forEach(ev =>
        canvas.addEventListener(ev, e => {
          if (this.mouse.isDown)
            this.handleMouseMove(e)

          this.interval && window.clearInterval(this.interval)
          delete this.interval
        }));
    }

    handleMouseMove(e){
      let { layerX: x, layerY: y } = e

      /* Touch support! */
      const { touches } = e
      if (touches)
        if (touches.length == 1)
          x = touches[0].clientX, y = touches[0].clientY;
        else if (touches.length > 1) {
          touches.forEach(t => this.handleMouseMove({
            x: t.clientX, y: t.clientY
          }));
          return
        }

      const {
        canvas, color, tool, radius, brushType, toolType
      } = this;
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
          toggleCursor('WAIT');
          window.setTimeout(() =>
            tool.bucket({ canvas, color, x: e.layerX, y: e.layerY }), 25);
          break;
        case "spray":
          tool.spray({ canvas, color, x, y, radius });
          // if (!this.interval)
          //   this.interval = window.setInterval(
          //     tool.spray.bind(this ,{ canvas, color, x, y, radius }),
          //     200
          //   );
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
      this.canvas.width = this.canvas.clientWidth;
      this.canvas.height = window.innerHeight;
      this.clear()
    }
}

export default Easle;
