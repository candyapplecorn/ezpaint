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
export const sameArray = (a, a2) => (a.reduce((a, c, i) => {
  if (!a) return a;
  if (c != a2[i]) return false;
  return a;
}, true) && a.length == a2.length)

// Given a coordinate, retrieves the RGBA array at it
export const coordToColor = ({ imageData, x, y }) => {
  return [
    imageData.data[((y * (imageData.width * 4)) + (x * 4)) + 0],
    imageData.data[((y * (imageData.width * 4)) + (x * 4)) + 1],
    imageData.data[((y * (imageData.width * 4)) + (x * 4)) + 2],
    imageData.data[((y * (imageData.width * 4)) + (x * 4)) + 3]
  ]
};

// Given a coordinate, sets the imageData @ that to COLOR
export const setCoordToColor = ({ imageData, x, y, color }) =>
    color.forEach((_, i) =>
      imageData.data[((y * (imageData.width * 4)) + (x * 4)) + i] = color[i])

export const toggleCursor = action => {
  const { body } = document;
  const canvas = document.getElementById('canvas');

  body.style.cursor    = action == "WAIT" ? "wait" : "";
  canvas.style.cursor  = action == "WAIT" ? "wait" : "";
};

export const addMatricies = (m1, m2) => {
  return m1.reduce((a, c, i) =>
    ((a.push(m1[i] + m2[i])), a)
  , [])
}
export const subtractMatricies = (m1, m2) => {
  return m1.reduce((a, c, i) =>
    ((a.push(m1[i] - m2[i])), a)
  , [])
}
