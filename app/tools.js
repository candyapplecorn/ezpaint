import {
  addMatricies, subtractMatricies,
  toggleCursor, sameArray,
  coordToColor, setCoordToColor
} from './util'
// import CantorPairingHash from './coordinate_hash';
import CoordinateHash from './coordinate_hash';
// import ToStringHash from './coordinate_hash';

export default {
    points: [],
    circle: ({ canvas, color, x, y, radius }) => {
      const context = canvas.getContext('2d');
      // const { offsetTop } = canvas

      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI, false);
      context.fillStyle = color;
      context.fill();
    },
    square: ({ canvas, color, x, y, radius }) => {
      const context = canvas.getContext('2d');
      // const { offsetTop } = canvas

      context.fillStyle = color;
      context.fillRect(x - radius, y - radius, radius + radius, radius + radius)
    },
    spray: ({ canvas, color, x, y, radius }) => {
      const context = canvas.getContext('2d');
      // const { offsetTop } = canvas
      radius *= 1.5;
      context.fillStyle = color;

      for (let i = 0, rx, ry; i < 10; i++){
        rx = Math.floor(Math.random() * radius - radius / 2)
        ry = Math.floor(Math.random() * radius - radius / 2)
        context.fillRect(x + rx, y + ry, 2, 2);
      }
    },
    bucket: ({ canvas, color, x, y }) => {
      const context = canvas.getContext('2d')
      let imageData = context.getImageData(0, 0, canvas.width, canvas.height)

      const { data } = context.getImageData(x, y, 1, 1)
      if (sameArray(data, [0, 0, 0, 0])) return;

      context.fillStyle = color;
      context.fillRect(x, y, 1, 1)

      color = context.getImageData(x, y, 1, 1).data;

      const offsets = [
        [1, 0], [0, 1], [0, -1], [-1, 0],  // cardinal
        [1, 1], [1, -1], [-1, 1], [-1, -1] // diagonal
      ];

      let curr = {x, y}, temp = {}, currColor;
      const chash = new CoordinateHash()
      const queue = [curr];


      while (queue.length){
        curr = queue.shift()

        if (chash.get(curr))
          continue;

        chash.set(curr)

        offsets.forEach(os => {
          [temp.x, temp.y] = [curr.x + os[0], curr.y + os[1]]
          currColor = coordToColor({ x: temp.x, y: temp.y, imageData }); // [r, g, b, a]

          // data = the color we want to overwrite
          // color = the color we want to overwrite with
          // currColor = the color we are looking at

          if (sameArray(currColor, data)){
            queue.push(Object.assign({}, temp))
            setCoordToColor({ imageData, x: temp.x, y: temp.y, color })
          }
        })
      }

      toggleCursor('RESUME');

      context.putImageData(imageData, 0, 0)
    },
    star: function ({ canvas, color, x: cx, y: cy, spikes, outerRadius, innerRadius }){
    /*
    Code for drawing a star taken from:
    https://stackoverflow.com/questions/25837158/how-to-draw-a-star-by-using-canvas-html5
    */
      var ctx = canvas.getContext('2d');
      var rot = Math.PI / 2 * 3;
      var x = cx;
      var y = cy;
      var step=Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius)
      for(let i = 0; i < spikes; i++){
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y)
        rot += step

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y)
        rot += step
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.lineWidth = 5;
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.fill();
    }
};
