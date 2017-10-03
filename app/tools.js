export default {
  paintbrush: {
    type: "paintbrush",
    points: [],
    drawCircle: ({ canvas, color, x, y, radius }) => {
      const context = canvas.getContext('2d');

      context.beginPath();
      context.arc(x - radius, y - radius, radius, 0, 2 * Math.PI, false);
      context.fillStyle = color;
      context.fill();
    }
  }
};
