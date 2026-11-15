import { computer } from "../players.js";
// I know this is not a jest test but it's like a driver test
const comp = new computer("computer");
comp.board.receiveAttack([5, 7]);
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    comp.board.receiveAttack([j, i]);
  }
}
console.log(comp.randomAttack());
