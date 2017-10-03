export const interpolate = ({x, x0, y0, x1, y1}) => {
  const numerator = y0 * (x1 - x) + y1 * (x - x0)
  const denominator = x1 - x0

  return Math.floor(numerator / denominator);
}

export const interpolateBetweenPoints = ({x: x0, y: y0}, {x: x1, y: y1}) => {
    const points = [];

    if (x0 > x1)
      [x0, y0, x1, y1] = [x1, y1, x0, y0]

    let x = x0

    while (x < x1){
      x++
      points.push({x, y: interpolate({x0, y0, x1, y1, x})})
    }

    return points;
};
