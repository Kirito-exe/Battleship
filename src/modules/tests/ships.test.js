import Ship from "../ship.js";

describe("testing ship", () => {
  test("length test", () => {
    const ship = new Ship(5);
    expect(ship.length).toBe(5);
  });
  test("length error", () => {
    expect(() => new Ship("damn")).toThrow("length needs to be a number");
    expect(() => new Ship(-9)).toThrow("length is in negatives");
  });
  test("hit test", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.hits).toBe(1);
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(3);
    ship.hit();
    expect(ship.hits).toBe(3);
    expect(ship.isSunk()).toBe(true);
  });
});
