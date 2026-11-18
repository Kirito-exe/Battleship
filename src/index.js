import "./reset.css";
import "./style.css";
import { gameController } from "./modules/gameController.js";
const reset = document.querySelector(".header button");
gameController();
reset.addEventListener("click", gameController);
