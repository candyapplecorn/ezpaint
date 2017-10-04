import { sameArray } from './util'

export default {
    points: [],
    circle: ({ canvas, color, x, y, radius }) => {
      const context = canvas.getContext('2d');
      const { offsetTop } = canvas

      context.beginPath();
      context.arc(x - radius, y - offsetTop, radius, 0, 2 * Math.PI, false);
      context.fillStyle = color;
      context.fill();
    },
    square: ({ canvas, color, x, y, radius }) => {
      const context = canvas.getContext('2d');
      const { offsetTop } = canvas

      context.fillStyle = color;
      context.fillRect(x - radius - radius, y - offsetTop - radius, radius + radius, radius + radius)
    },
    bucket: ({ canvas, color, x, y }) => {
      const context = canvas.getContext('2d')
      let imageData = context.getImageData(0, 0, canvas.width, canvas.height)

      const { data } = context.getImageData(x, y, 1, 1)
      if (sameArray(data, [0, 0, 0, 0])) return;

      context.fillStyle = color;
      context.fillRect(x, y, 1, 1)

      color = context.getImageData(x, y, 1, 1).data; // overwrite "red" with [255, 0, 0, ?]

      const offsets = [[1, 0], [0, 1], [0, -1], [-1, 0]];
      let curr = {x, y}, temp = {}, currColor;
      const queue = [curr];

      while (queue.length){
        curr = queue.shift()

        offsets.forEach(os => {
          [temp.x, temp.y] = [curr.x + os[0], curr.y + os[1]]
          currColor = context.getImageData(temp.x, temp.y, 1, 1).data

          // data = the color we want to overwrite
          // color = the color we want to overwrite with
          // currColor = the color we are looking at

          if (sameArray(currColor, data)){// && !sameArray(color, currColor)){
            queue.push(Object.assign({}, temp))
            context.fillRect(temp.x, temp.y, 1, 1)
          }
        })
      }
    }
};

// const coordToColor = ({ imageData, x, y }) => {
//   return [
//     imageData.data[((y * (imageData.width * 4)) + (x * 4)) + 0],
//     imageData.data[((y * (imageData.width * 4)) + (x * 4)) + 1],
//     imageData.data[((y * (imageData.width * 4)) + (x * 4)) + 2],
//     imageData.data[((y * (imageData.width * 4)) + (x * 4)) + 3]
//   ]
// };
