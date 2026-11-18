import Ship from "./ship.js";
import { isSafeMove } from "./helpers.js";
export default class Gameboard {
  #board = [];
  #missedAttacks = [];
  shipsArr = [];
  constructor() {
    for (let i = 0; i < 10; i++) {
      this.#board.push([]);
      for (let j = 0; j < 10; j++) {
        this.#board[i][j] = new cell();
      }
    }
  }
  receiveAttack(coord) {
    if (isSafeMove(coord)) {
      let [y, x] = coord;
      if (this.#board[x][y].ship === null) {
        this.#board[x][y].toggleHit();
        this.#missedAttacks.push(coord);
        return this.#board[x][y].hitStatus;
      } else {
        if (this.#board[x][y].hitStatus === true) {
          throw new Error("hit once");
        }
        this.#board[x][y].toggleHit();
        this.#board[x][y].ship.hit();
        if (this.#checkShipSunk(this.#board[x][y].ship))
          return `${this.#board[x][y].ship.name} sank`;
        return this.#board[x][y].hitStatus;
      }
    } else {
      throw new RangeError("bad coords");
    }
  }
  placeShip(startCoords, shipName, shiplen, alignment = "hori") {
    const [y, x] = startCoords;
    if (!isSafeMove(startCoords)) throw new RangeError("bad start coords");
    if (alignment === "hori") {
      if (!isSafeMove([x, y + shiplen])) {
        return false;
      }
    } else if (alignment === "vert") {
      if (!isSafeMove([x + shiplen, y])) {
        return false;
      }
    } else {
      throw new TypeError("alignment: hori or vert");
    }
    for (let i = 0; i < shiplen; i++) {
      if (alignment === "hori") {
        if (this.#board[x][y + i].ship !== null) {
          return false;
        }
      } else if (alignment === "vert") {
        if (this.#board[x + i][y].ship !== null) {
          return false;
        }
      }
    }
    let newShip = new Ship(shiplen, shipName);
    this.shipsArr.push(newShip);
    for (let i = 0; i < shiplen; i++) {
      if (alignment === "hori") {
        this.#board[x][y + i].ship = newShip;
      } else if (alignment === "vert") {
        this.#board[x + i][y].ship = newShip;
      }
    }
    return true;
  }
  #checkShipSunk(ship) {
    if (ship.isSunk()) {
      return true;
    }
  }
  shipStatus() {
    const sunkenShips = this.shipsArr.filter((ship) => ship.isSunk());
    return sunkenShips.map((ship) => ship.name);
  }
  get board() {
    return this.#board;
  }
  delShip(name) {
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        if (this.#board[y][x].ship !== null) {
          if (this.#board[y][x].ship.name === name) {
            this.#board[y][x].ship = null;
          }
        }
      }
    }
  }
  delAllShips() {
    this.shipsArr.forEach((ship) => {
      this.delShip(ship.name);
    });
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
