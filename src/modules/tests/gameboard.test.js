import Gameboard from "../gameboard.js";
let gb = new Gameboard();
describe("receiveAttack", () => {
  gb.placeShip([0, 0], "carrier", 5, "hori");
  test("range Error", () => {
    expect(() => gb.receiveAttack([1, 10])).toThrow();
  });
  test("hitstatus check", () => {
    expect(gb.receiveAttack([4, 7])).toBe(true);
  });
  test("hit with a ship", () => {
    expect(gb.receiveAttack([1, 0])).toBe(true);
    expect(gb.board[0][1].ship.hits).toBe(1);
    gb.receiveAttack([2, 0]);
    expect(() => gb.receiveAttack([1, 0])).toThrow("hit once");
    expect(gb.board[0][1].ship.hits).toBe(2);
    gb.receiveAttack([3, 0]);
    gb.receiveAttack([4, 0]);
    expect(gb.receiveAttack([0, 0])).toBe("carrier sank");
  });
});
describe("placeShip", () => {
  gb.placeShip([0, 0], "carrier", 5, "hori");
  test("placing ships hori", () => {
    expect(gb.board[0][0].ship.name).toBe("carrier");
    expect(gb.board[0][1].ship.name).toBe("carrier");
    expect(gb.board[0][2].ship.name).toBe("carrier");
    expect(gb.board[0][3].ship.name).toBe("carrier");
    expect(gb.board[0][4].ship.name).toBe("carrier");
    expect(gb.placeShip([0, 0], "battleship", 4, "vert")).toBe("carrier");
    expect(gb.board[0][0].ship.name).toBe("carrier");
  });
  gb.placeShip([7, 1], "battleship", 4, "vert");
  test("placing ships vert", () => {
    expect(gb.board[1][7].ship.name).toBe("battleship");
    expect(gb.board[2][7].ship.name).toBe("battleship");
    expect(gb.board[3][7].ship.name).toBe("battleship");
    expect(gb.board[4][7].ship.name).toBe("battleship");
    expect(gb.placeShip([7, 1], "idk", 4, "vert")).toBe("battleship");
  });
  test("error testing", () => {
    expect(() => {
      gb.placeShip([-4, 0]);
    }).toThrow("bad start coords");
    expect(() => {
      gb.placeShip([0, 11]);
    }).toThrow("bad start coords");
    expect(() => {
      gb.placeShip([4, 0], "damn", 4, "nun");
    }).toThrow("alignment: hori or vert");
    expect(gb.placeShip([9, 0], "damn", 4, "hori")).toBe(false);
  });
});
