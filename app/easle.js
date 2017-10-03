import { interpolateBetweenPoints } from './util';

const TOOL = {
  paintbrush: {
    type: "paintbrush",
    points: [],
    drawCircle: ({ canvas, color, x, y, radius }) => {
      const context = canvas.getContext('2d');

      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI, false);
      context.fillStyle = color;
      context.fill();
    }
  }
};
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
      this.tool = TOOL.paintbrush
      this.mouse = MOUSE
    }

    configureContainer(canvas){
      canvas.addEventListener('mousedown', e => (this.mouse.isDown = true));
      ['mouseup', 'mouseleave', 'blur'].forEach(ev =>
        canvas.addEventListener(ev, _ => {
          this.mouse.isDown = false;
          this.tool.points = [];
        })
      )

      window.addEventListener('resize', e => {
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
            const ipoints = interpolateBetweenPoints(tool.points[0], tool.points[1])
            ipoints.forEach(({x, y}) => tool.drawCircle({canvas, color, x, y, radius }))
            tool.points.shift()
          }
      }
    }

    resize(){
      this.canvas.width = this.canvas.clientWidth;
      this.canvas.height = window.innerHeight * 3 / 5;
    }
}

export default Easle;
