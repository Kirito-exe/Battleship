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
  randomShipPlace(name, len, alignment) {
    let coords = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];
    let condition = this.gb.placeShip(coords, name, len, alignment);
    while (!condition) {
      console.log("loop ran for " + name);
      coords = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
      condition = this.gb.placeShip(coords, name, len, alignment);
    }
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
  randomAttack(player) {
    console.log("random attack ran");
    let coords = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];
    let condition = player.board.receiveAttack(coords);
    console.log(condition);
    while (!condition) {
      coords = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
      condition = player.board.receiveAttack(coords);
    }
  }
}
