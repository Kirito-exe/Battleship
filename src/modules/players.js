import Gameboard from "./gameboard.js";

class player {
  gb;
  constructor(name) {
    this.gb = new Gameboard();
    this.name = name;
  }
  get board() {
    return this.gb;
  }
}
export class realPlayer extends player {
  constructor(name) {
    super(name);
  }
}
export class computer extends player {
  constructor(name) {
    super(name);
  }
  isComputer() {
    return true;
  }
}
