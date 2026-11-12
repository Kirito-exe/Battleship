// import Ship from "./ship.js";
import { isSafeMove } from "./helpers.js";
export default class Gameboard {
  #board = [];
  #missedAttacks = [];
  constructor() {
    // const carrier = new Ship(5);
    // const battleship = new Ship(4);
    // const destroyer = new Ship(3);
    // const submarine = new Ship(3);
    // const patrol = new Ship(2);
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.#board = new cell();
      }
    }
  }
  receiveAttack(coord) {
    if (isSafeMove(coord)) {
      let [x, y] = coord;
      if (this.#board[x][y].ship === null) {
        this.#board[x][y].toggleHit();
        this.#missedAttacks.push(coord);
      } else {
        this.#board[x][y].toggleHit();
        this.#board[x][y].ship.hit();
      }
    }
  }
}
class cell {
  #hitStatus = false;
  #shipInfo = null;
  constructor() {}
  toggleHit() {
    this.#hitStatus = true;
  }
  get hitStatus() {
    return this.#hitStatus;
  }
  get ship() {
    return this.#shipInfo;
  }
  set ship(ship) {
    this.#shipInfo = ship;
  }
}
