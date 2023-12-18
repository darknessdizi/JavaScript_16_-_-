import GamePlay from "./firstTask/GamePlay";
import GameController from "./firstTask/GameController";
import WindowEdit from "./secondTask/WindowEdit";
import WindowController from "./secondTask/WindowController";

export default function createLinks() {
  const main = document.createElement("main");
  main.classList.add("content");
  const listTask = [runTask1, runTask2, runTask3];

  for (let i = 0; i < 3; i += 1) {
    const link = document.createElement("a");
    link.textContent = `Задача ${i + 1}`;
    main.append(link);
    link.addEventListener("click", listTask[i]);
  }
  return main;
}

const body = document.querySelector("body");
const mainDiv = createLinks();
body.append(mainDiv);

function runTask1() {
  body.innerHTML = "";
  const game = new GamePlay();
  const controller = new GameController(game);
  controller.init();
}

function runTask2() {
  body.innerHTML = "";
  const edit = new WindowEdit();
  const controller = new WindowController(edit);
  controller.init();
}

function runTask3() {
  body.innerHTML = "";
}
