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
      this.canvas.width = this.canvas.clientWidth
      this.canvas.height = this.canvas.clientHeight

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
        canvas.addEventListener(ev, _ => (this.mouse.isDown = false))
      )

      canvas.addEventListener('resize', e => {
        // todo: resize
      });

      canvas.addEventListener('mousemove', e => {
        if (this.mouse.isDown)
          this.handleMouseMove(e)
      });
    }

    handleMouseMove(e){
      const { clientX, clientY } = e
      const { screenX, screenY } = e
      const { canvas, color, tool, radius } = this

      switch (tool.type){
        case "paintbrush":
          tool.drawCircle({ canvas, color, x: clientX, y: clientY, radius })
      }
    }
}

export default Easle;
