import Gameboard from "./gameboard.js";

class player {
  gb;
  constructor() {
    this.gb = new Gameboard();
  }
  get board() {
    return this.gb;
  }
}
export class realPlayer extends player {
  constructor() {
    super();
  }
}
export class computer extends player {
  constructor() {
    super();
  }
}
