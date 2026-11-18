import Gameboard from "./gameboard.js";
import { isSafeMove } from "./helpers.js";
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
  queue = [];
  constructor(name) {
    super(name);
  }
  isComputer() {
    return true;
  }
  randomAttack(player) {
    console.log(this.queue);
    console.log("random attack ran");
    let coords;
    if (this.queue.length === 0) {
      coords = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    } else {
      coords = this.queue.pop();
    }
    let condition = player.board.receiveAttack(coords);
    console.log(condition);
    if (condition === "ship") {
      const nextSteps = generateNextSteps(coords);
      this.queue.push(...nextSteps);
    }
    while (!condition && condition !== "ship") {
      coords = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
      condition = player.board.receiveAttack(coords);
      if (condition === "ship") {
        const nextSteps = generateNextSteps(coords);
        this.queue.push(...nextSteps);
      }
    }
  }
}

function generateNextSteps(coords) {
  const steps = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const nextCoords = [];
  steps.forEach((step) => {
    const newCoord = [coords[0] + step[0], coords[1] + step[1]];
    if (isSafeMove(newCoord)) {
      nextCoords.push(newCoord);
    }
  });
  return nextCoords;
}
