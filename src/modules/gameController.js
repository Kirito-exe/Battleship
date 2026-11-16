import { realPlayer, computer } from "./players.js";
import { createBoard, disableBoard, renderBoard } from "./DOM.js";
export function gameController() {
  const comp = new computer("computer");
  const p1 = new realPlayer("player1");
  console.log(p1.board.placeShip([0, 0], "carrier", 5, "hori"));
  console.log(p1.board.placeShip([7, 1], "battleship", 4, "hori"));
  console.log(comp.board.placeShip([1, 0], "patrol", 5, "hori"));
  console.log(comp.board.placeShip([3, 1], "hi", 5, "vert"));
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
    if (winningCondition(inactive)) {
      alert(`${active.name} won`);
      disableBoard(active);
      disableBoard(inactive);
    }
  }
  function startGame() {
    const boards = document.querySelectorAll(".board");
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
  function winningCondition(player) {
    if (player.board.shipStatus().length === player.board.shipsArr.length)
      return true;
  }
  startGame();
}
