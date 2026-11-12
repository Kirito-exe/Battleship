import Gameboard from "../gameboard.js";
let gb = new Gameboard();
describe("receiveAttack", () => {
  test("range Error", () => {
    expect(() => gb.receiveAttack([1, 10])).toThrow();
  });
  test("hitstatus check", () => {
    expect(gb.receiveAttack([4, 7])).toBe(true);
  });
});
