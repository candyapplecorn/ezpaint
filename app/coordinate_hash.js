
// 6 - 7 seconds to fill whole screen on chromebook... works, but slow
// This is the fastest method I've found so far.
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

// About the same speed as coordinate hash but glitches out and
// creates odd triangular sections
class CantorPairingHash {
  constructor(coord){
    this.hash = {}
  }
  set(coord){
    this.hash[this.cantorPair(coord)] = true
  }
  get(coord){
    return Boolean(this.hash[this.cantorPair(coord)])
  }
  /*
  I discovered cantorPairing thanks to this stackoverflow post
  https://stackoverflow.com/questions/919612/mapping-two-integers-to-one-in-a-unique-and-deterministic-way
  */
  cantorPair({ x, y }){
    return ((x + y) * (x + y + 1)) / 2 + y
  }
}

// export default CantorPairingHash;

// 10 - 11 seconds
class ToStringHash {
  constructor(){ this.hash = {} }
  set({ x, y }){
    const { hash } = this
    hash[`${x},${y}`] = true
  }
  get({ x, y }){
    const { hash } = this
    return Boolean(hash[`${x},${y}`])
  }
}

// export default ToStringHash;
