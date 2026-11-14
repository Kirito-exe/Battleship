const container = document.querySelector(".container");
export function createBoard(player) {
  const board = document.createElement("div");
  board.setAttribute("class", "board");
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("button");
      board.appendChild(cell);
      cell.addEventListener("click", () => {
        player.board.receiveAttack([i, j]);
        cell.disabled = true;
        if (player.board.board[i][j].ship !== null) {
          cell.style.backgroundColor = "green";
          cell.dataset.ship = player.board.board[i][j].ship.name;
          if (player.board.board[i][j].ship.isSunk()) {
            isSunkDisplay(board, player);
          }
        }
      });
    }
  }
  container.appendChild(board);
}

function isSunkDisplay(board, player) {
  const allCells = board.querySelectorAll("button");
  console.log(allCells);
  const sunkenShips = player.board.shipStatus();
  allCells.forEach((cell) => {
    console.log(cell);
    if (sunkenShips.includes(cell.dataset.ship)) {
      cell.style.backgroundColor = "yellow";
    }
  });
}
