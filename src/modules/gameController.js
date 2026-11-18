import { realPlayer, computer } from "./players.js";
import {
  createBoard,
  disableBoard,
  enableBoard,
  placeShipsRender,
  renderBoard,
  winningDialog,
} from "./DOM.js";
export function gameController() {
  const buttons = document.querySelector(".buttons");
  const container = document.querySelector(".container");
  const random = document.createElement("button");
  const start = document.createElement("button");
  buttons.textContent = "";
  start.textContent = "start";
  container.textContent = "";
  random.textContent = "random";
  buttons.appendChild(random);
  buttons.appendChild(start);

  const comp = new computer("Computer");
  const p1 = new realPlayer("Player");
  createBoard(p1);
  createBoard(comp);
  let active = p1;
  let inactive = comp;
  async function playRound() {
    if (winningCondition(comp)) {
      winningDialog(p1);
      disableBoard(active);
      disableBoard(inactive);
    }
    if (winningCondition(p1)) {
      winningDialog(comp);
      disableBoard(active);
      disableBoard(inactive);
    }
    if (inactive === comp) {
      comp.randomAttack(p1);
      renderBoard(p1);
    }
  }
  function startGame() {
    enableBoard(comp);
    disableBoard(active);
    const boards = document.querySelectorAll(".board");
    comp.randomShipPlace("carrier", 5, randomAlignment());
    comp.randomShipPlace("battleship", 4, randomAlignment());
    comp.randomShipPlace("destroyer", 3, randomAlignment());
    comp.randomShipPlace("submarine", 3, randomAlignment());
    comp.randomShipPlace("patrol", 2, randomAlignment());
    boards.forEach((board) => {
      const cells = board.querySelectorAll("button");
      cells.forEach((cell) => {
        cell.addEventListener("click", () => {
          playRound();
          console.log("hi");
        });
      });
    });
    playRound();
  }

  // function switchPlayers() {
  //   const temp = active;
  //   active = inactive;
  //   inactive = temp;
  // }

  function placeShip() {
    random.addEventListener("click", () => {
      start.disabled = false;
      p1.board.delAllShips();
      p1.randomShipPlace("carrier", 5, randomAlignment());
      p1.randomShipPlace("battleship", 4, randomAlignment());
      p1.randomShipPlace("destroyer", 3, randomAlignment());
      p1.randomShipPlace("submarine", 3, randomAlignment());
      p1.randomShipPlace("patrol", 2, randomAlignment());
      placeShipsRender(p1);
    });
  }
  function flowControl() {
    start.disabled = true;
    disableBoard(p1);
    disableBoard(comp);
    placeShip();
    start.addEventListener("click", () => {
      startGame();
      random.disabled = true;
      start.disabled = true;
    });
  }
  function winningCondition(player) {
    if (player.board.shipStatus().length === player.board.shipsArr.length)
      return true;
    return false;
  }
  function randomAlignment() {
    const random = Math.floor(Math.random() * 2);
    if (random === 0) {
      return "hori";
    } else {
      return "vert";
    }
  }
  flowControl();
}
