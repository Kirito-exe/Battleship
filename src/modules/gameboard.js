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
      if (this.#board[x][y].hitStatus === true) {
        return false;
      } else if (this.#board[x][y].ship === null) {
        this.#board[x][y].toggleHit();
        this.#missedAttacks.push(coord);
        return this.#board[x][y].hitStatus;
      } else {
        this.#board[x][y].toggleHit();
        this.#board[x][y].ship.hit();
        return "ship";
      }
    } else {
      return false;
    }
  }
  placeShip(startCoords, shipName, shiplen, alignment = "hori") {
    const [y, x] = startCoords;
    if (!isSafeMove(startCoords)) throw new RangeError("bad start coords");
    if (alignment === "hori") {
      if (!isSafeMove([x, y + shiplen - 1])) {
        return false;
      }
    } else if (alignment === "vert") {
      if (!isSafeMove([x + shiplen - 1, y])) {
        return false;
      }
    } else {
      throw new TypeError("alignment: hori or vert");
    }
    for (let i = 0; i < shiplen; i++) {
      if (alignment === "hori") {
        console.log([x, y + i]);
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
  shipStatus() {
    const sunkenShips = this.shipsArr.filter((ship) => ship.isSunk());
    return sunkenShips.map((ship) => ship.name);
  }
  get board() {
    return this.#board;
  }
  delAllShips() {
    console.log(this.shipsArr);
    this.shipsArr = [];
    console.log(this.shipsArr);
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        if (this.#board[y][x].ship !== null) {
          this.#board[y][x].ship = null;
          console.log(this.#board[y][x].ship);
        }
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
