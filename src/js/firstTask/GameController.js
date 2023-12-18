import GameState from "./GameState";
import createLinks from "../welcomePage";

export default class GameController {
  constructor(game) {
    this.game = game;
    this.gameState = new GameState();
    this.step = 1000;
  }

  init() {
    this.game.addMain();
    this.game.addCellClickListener(this.onCellClick.bind(this));
    this.game.addResetListener(this.onResetClick.bind(this));
    this.game.addReturnListener(this.onReturnClick.bind(this));

    this.nextStep();
  }

  nextIndex(arrayHole) {
    // Получение индекса для следующего шага
    let index = this.gameState.index;
    while (this.gameState.index === index) {
      this.gameState.index = Math.floor(Math.random() * arrayHole.length);
    }
  }

  onCellClick(index) {
    // Callback для события 'click' в поле игры
    const hasMole = this.game.cells[index].classList.value;
    if (hasMole.includes("hole_has-mole") && this.gameState.statusClick) {
      this.gameState.statusClick = false;
      this.step -= 10;
      clearInterval(this.gameState.timer);
      this.game.addStrike(index);
      this.gameState.score += 1;
      setTimeout(() => {
        this.gameState.statusClick = true;
        this.game.removeStrike(this.gameState.hole);
        this.gameState.hole.classList.remove("hole_has-mole");

        this.nextStep();
      }, 500);
    }
  }

  onResetClick() {
    // Нажали кнопку reset (перезапуск игры)
    this.game.popup.classList.remove("popup-active");
    this.gameState = new GameState();
    this.nextStep();
  }

  onReturnClick() {
    // Нажали кнопку return (возврат в главное меню)
    clearInterval(this.gameState.timer);
    const body = document.querySelector("body");
    body.innerHTML = "";
    const main = createLinks();
    body.append(main);
  }

  runInterval() {
    // Запуск интервала для непрерывных ходов unit
    this.gameState.timer = setInterval(() => {
      this.gameState.count += 1;
      // console.log("Следующий гоблин", this.gameState.count);
      this.gameState.hole.classList.remove("hole_has-mole");
      this.nextIndex(this.game.cells);
      this.gameState.hole = this.game.cells[this.gameState.index];
      this.gameState.hole.classList.add("hole_has-mole");
      if (this.gameState.count > 4) {
        clearInterval(this.gameState.timer);
        this.gameOver();
      }
    }, this.step);
  }

  nextStep() {
    // Первоначальный запуск цепочки ходов unit
    this.nextIndex(this.game.cells);
    this.gameState.hole = this.game.cells[this.gameState.index];
    this.gameState.hole.classList.add("hole_has-mole");

    this.runInterval();
  }

  gameOver() {
    this.gameState.hole.classList.remove("hole_has-mole");
    this.game.popup.classList.add("popup-active");
    this.game.spanResult.textContent = `Ваш результат: ${this.gameState.score}`;
    this.step = 1000;
  }
}
