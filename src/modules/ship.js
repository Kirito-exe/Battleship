export default class Ship {
  #length;
  #hits = 0;
  constructor(len) {
    if (typeof len !== "number")
      throw new TypeError("length needs to be a number");
    if (len <= 0) throw new Error("length is in negatives");
    this.#length = len;
  }
  get length() {
    return this.#length;
  }
  get hits() {
    return this.#hits;
  }
  hit() {
    if (this.#hits === this.#length) return;
    this.#hits++;
  }
  isSunk() {
    if (this.#hits >= this.#length) return true;
    return false;
  }
}
