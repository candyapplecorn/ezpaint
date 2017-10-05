class CoordinateHash {
  constructor(coord){
    this.hash = {}
    if (coord) this.set(coord)
  }
  set({ x, y }){
    const { hash } = this;

    if (hash[x])
      hash[x][y] = true;
    else
      hash[x] = { [y]: true }
  }
  get({ x, y }){
    const { hash } = this;
    if (!hash[x]) return false
    return Boolean(hash[x][y])
  }
}

export default CoordinateHash;
