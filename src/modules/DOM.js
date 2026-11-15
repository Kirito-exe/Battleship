const container = document.querySelector(".container");
export function createBoard(player) {
  const board = document.createElement("div");
  board.setAttribute("class", "board");
  board.dataset.pName = player.name;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("button");
      board.appendChild(cell);
      cell.dataset.x = j;
      cell.dataset.y = i;
      cell.addEventListener("click", () => {
        player.board.receiveAttack([j, i]);
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

export function disableBoard(player) {
  const boards = document.querySelectorAll(".board");
  boards.forEach((board) => {
    if (board.dataset.pName === player.name) {
      const cells = board.querySelectorAll("button");
      cells.forEach((cell) => {
        cell.disabled = true;
      });
    }
  });
}

export function enableBoard(player) {
  const boards = document.querySelectorAll(".board");
  boards.forEach((board) => {
    if (board.dataset.pName === player.name) {
      const cells = board.querySelectorAll("button");
      cells.forEach((cell) => {
        cell.disabled = false;
        if (player.board.board[cell.dataset.y][cell.dataset.x].hitStatus) {
          cell.disabled = true;
          if (
            player.board.board[cell.dataset.y][cell.dataset.x].ship !== null
          ) {
            cell.style.backgroundColor = "green";
            if (
              player.board.board[cell.dataset.y][cell.dataset.x].ship.isSunk()
            ) {
              isSunkDisplay(board, player);
            }
          }
        }
      });
    }
  });
}
