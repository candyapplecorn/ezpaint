const interpolateY = ({x, x0, y0, x1, y1}) => {
  const numerator = y0 * (x1 - x) + y1 * (x - x0)
  const denominator = x1 - x0

  return Math.floor(numerator / denominator);
}
const interpolateX = ({x0, y0, x1, y1, y}) => {
  const numerator = (y - y0) * (x1 - x0)
  const denominator = y1 - y0

  return Math.floor(numerator / denominator) + x0
}

export const interpolateBetweenPoints = ({x: x0, y: y0}, {x: x1, y: y1}) => {
    const points = [];
    const dx = Math.abs(x0 - x1), dy = Math.abs(y0 - y1);

    if (dx > dy){
      if (x0 > x1)
        [x0, y0, x1, y1] = [x1, y1, x0, y0]

      let x = x0

      while (x < x1){
        x++
        points.push({x, y: interpolateY({x0, y0, x1, y1, x})})
      }
    } else {
      if (y0 > y1)
        [x0, y0, x1, y1] = [x1, y1, x0, y0]

      let y = y0

      while (y < y1){
        y++
        points.push({y, x: interpolateX({x0, y0, x1, y1, y})})
      }
    }

    return points;
};
