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
      cell.className = "cell";
      cell.draggable = false;
      cell.addEventListener("click", () => {
        player.board.receiveAttack([j, i]);
        cell.disabled = true;
        cell.className = "hit";
        if (player.board.board[i][j].ship !== null) {
          cell.style.backgroundColor = "green";
          cell.dataset.ship = player.board.board[i][j].ship.name;
          if (player.board.board[i][j].ship.isSunk()) {
            isSunkDisplay(board, player);
          }
        }
      });
      cell.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
      cell.addEventListener("drop", (event) => {
        console.log("i ran");
        event.preventDefault();
        const name = event.dataTransfer.getData("name");
        const ship = document.querySelector(`#${name}`);
        if (ship.draggable === false) {
          return;
        }
        const len = event.dataTransfer.getData("length");
        const alignment = event.dataTransfer.getData("alignment");
        console.log(name, len, alignment, [cell.dataset.x, cell.dataset.y]);
        const condition = player.board.placeShip(
          [parseInt(cell.dataset.x), parseInt(cell.dataset.y)],
          name,
          parseInt(len),
          alignment,
        );
        console.log(condition);
        if (condition) {
          ship.draggable = false;
        }
        placeShipsRender(player);
        if (player.board.shipsArr.length === 5) {
          const start = document.querySelector("#start");
          start.disabled = false;
        }
      });
    }
  }
  container.appendChild(board);
}

function isSunkDisplay(board, player) {
  const allCells = board.querySelectorAll("button");
  const sunkenShips = player.board.shipStatus();
  allCells.forEach((cell) => {
    if (sunkenShips.includes(cell.dataset.ship)) {
      cell.style.backgroundColor = " rgb(0, 66, 0)";
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
        cell.className = "cell";
        if (player.board.board[cell.dataset.y][cell.dataset.x].hitStatus) {
          cell.disabled = true;
          if (
            player.board.board[cell.dataset.y][cell.dataset.x].ship !== null
          ) {
            cell.className = "hasShip";
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

export function renderBoard(player) {
  const boards = document.querySelectorAll(".board");
  boards.forEach((board) => {
    if (board.dataset.pName === player.name) {
      const cells = board.querySelectorAll("button");
      cells.forEach((cell) => {
        cell.disabled = true;
        cell.className = "cell";
        cell.textContent = "";
        if (player.board.board[cell.dataset.y][cell.dataset.x].hitStatus) {
          cell.disabled = true;
          cell.className = "hit";
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
export function placeShipsRender(player) {
  const boards = document.querySelectorAll(".board");
  boards.forEach((board) => {
    if (board.dataset.pName === player.name) {
      const cells = board.querySelectorAll("button");
      cells.forEach((cell) => {
        cell.disabled = true;
        cell.dataset.ship = "";
        if (player.board.board[cell.dataset.y][cell.dataset.x].ship !== null) {
          cell.dataset.ship =
            player.board.board[cell.dataset.y][cell.dataset.x].ship.name;
          cell.className = "hasShip";
          cell.textContent =
            player.board.board[cell.dataset.y][cell.dataset.x].ship.length;
        } else {
          cell.className = "cell";
          cell.textContent = "";
        }
      });
    }
  });
}
export function winningDialog(player) {
  const dialog = document.querySelector(".winning");
  const div = dialog.querySelector("div");
  div.textContent = `${player.name} won!`;
  dialog.showModal();
}
export function dragElements(alignment, player) {
  let box = document.querySelector(".placementContainer");
  if (box === null) {
    box = document.createElement("div");
    container.appendChild(box);
  }
  box.textContent = "";
  box.className = "placementContainer";
  box.appendChild(createShip("carrier", 5, alignment, player));
  box.appendChild(createShip("battleship", 4, alignment, player));
  box.appendChild(createShip("destroyer", 3, alignment, player));
  box.appendChild(createShip("submarine", 3, alignment, player));
  box.appendChild(createShip("patrol", 2, alignment, player));
}
function createShip(name, length, alignment, player) {
  const ship = document.createElement("div");
  ship.className = "placementShip";
  ship.draggable = true;
  ship.id = name;
  console.log(player.board.shipsArr.map((ship) => ship.name));
  console.log(name);
  console.log(
    player.board.shipsArr.map((shipele) => shipele.name).includes(name),
  );
  if (player.board.shipsArr.map((shipele) => shipele.name).includes(name)) {
    console.log("i ran");
    ship.draggable = false;
  }
  ship.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("name", name);
    event.dataTransfer.setData("length", length);
    event.dataTransfer.setData("alignment", alignment);
  });
  if (alignment === "hori") ship.style.gridAutoFlow = "column";
  else ship.style.gridAutoFlow = "row";
  for (let i = 0; i < length; i++) {
    const cell = document.createElement("div");
    cell.className = "placingCell";
    ship.appendChild(cell);
  }
  return ship;
}
