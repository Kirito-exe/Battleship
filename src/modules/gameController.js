import { realPlayer, computer } from "./players.js";
import {
  createBoard,
  disableBoard,
  enableBoard,
  placeShipsRender,
  renderBoard,
} from "./DOM.js";
export function gameController() {
  const container = document.querySelector(".container");
  const random = document.createElement("button");
  const start = document.createElement("button");
  start.textContent = "start";
  container.textContent = "";
  random.textContent = "random";
  container.appendChild(random);
  container.appendChild(start);
  const comp = new computer("computer");
  const p1 = new realPlayer("player1");
  createBoard(p1);
  createBoard(comp);
  let active = p1;
  let inactive = comp;
  function playRound() {
    if (inactive === comp) {
      disableBoard(active);
      comp.randomAttack(p1);
      renderBoard(p1);
    }
    if (winningCondition(comp)) {
      alert(`${active.name} won`);
      disableBoard(active);
      disableBoard(inactive);
    }
    if (winningCondition(p1)) {
      alert(`${inactive.name} won`);
      disableBoard(active);
      disableBoard(inactive);
    }
  }
  function startGame() {
    enableBoard(comp);
    const boards = document.querySelectorAll(".board");
    comp.randomShipPlace("carrier", 5, "hori");
    comp.randomShipPlace("battleship", 4, "hori");
    comp.randomShipPlace("destroyer", 3, "hori");
    comp.randomShipPlace("submarine", 3, "hori");
    comp.randomShipPlace("patrol", 2, "hori");
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
      p1.board.delAllShips();
      p1.randomShipPlace("carrier", 5, "hori");
      p1.randomShipPlace("battleship", 4, "hori");
      p1.randomShipPlace("destroyer", 3, "hori");
      p1.randomShipPlace("submarine", 3, "hori");
      p1.randomShipPlace("patrol", 2, "hori");
      placeShipsRender(p1);
    });
  }
  function flowControl() {
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
  flowControl();
}
