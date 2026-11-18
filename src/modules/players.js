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
    const coords = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];
    const [x, y] = coords;
    console.log([x, y]);
    if (player.board.board[y][x].hitStatus) {
      this.randomAttack(player);
      console.log("condition ran");
      return;
    }
    player.board.receiveAttack(coords);
    return coords;
  }
}
