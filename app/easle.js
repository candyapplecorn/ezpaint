import { interpolateBetweenPoints } from './util';
import TOOLS from './tools';

const MOUSE = {
  x: 0, y: 0, isDown: false
}
class Easle {
    constructor({ canvas, colorPicker }){
      this.canvas = canvas;
      this.resize();

      this.configureContainer(canvas)

      colorPicker.subscribers.push(cp => (this.color = cp.color))
      this.color = colorPicker.color
      this.radius = 10;
      this.tool = TOOLS.paintbrush
      this.mouse = MOUSE
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

      window.addEventListener('resize', _ => {
        this.resize()
      });

      canvas.addEventListener('mousemove', e => {
        if (this.mouse.isDown)
          this.handleMouseMove(e)
      });
    }

    handleMouseMove(e){
      const { clientX: x, clientY: y } = e
      const { canvas, color, tool, radius } = this
      tool.points.push({x, y})

      switch (tool.type){
        case "paintbrush":
          if (tool.points.length < 2)
            tool.drawCircle({ canvas, color, x, y, radius })
          else {
            const ipoints = [];

            tool.points.slice(1).forEach((p, i, a) => {
              ipoints.push(
              ... interpolateBetweenPoints(tool.points[i], p)
            )})

            ipoints.forEach(({x, y}) => tool.drawCircle({canvas, color, x, y, radius }))

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
