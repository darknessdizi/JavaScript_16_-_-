/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/firstTask/GamePlay.js
class GamePlay {
  constructor() {
    this.boardsize = 16;
    this.conteiner = null;
    this.cells = [];
    this.cellClickListeners = [];
    this.popup = null;
    this.spanResult = null;
    this.resetListeners = [];
    this.returnListeners = [];
  }
  _createMain() {
    // Создает элемент main содержащий поле игры
    const main = document.createElement("main");
    main.classList.add("content");
    const mainDiv = document.createElement("div");
    mainDiv.classList.add("hole_game");
    main.append(mainDiv);
    for (let i = 0; i < this.boardsize; i += 1) {
      const element = document.createElement("div");
      element.classList.add("hole");
      mainDiv.append(element);
      element.addEventListener("click", event => this.onCellClick(event));
      this.cells.push(element);
    }
    this._createButton(main);
    this.conteiner = main;
  }
  _createButton(mainBlock) {
    // Создаем кнопку возврата на главную страницу
    const btn = document.createElement("button");
    btn.textContent = "Return";
    btn.classList.add("btn__return");
    mainBlock.append(btn);
    btn.addEventListener("click", event => this.onReturnClick(event));
  }
  onCellClick(event) {
    // Запуск сохраненных callback из списка для текущего индекса
    const index = this.cells.indexOf(event.currentTarget);
    this.cellClickListeners.forEach(o => o.call(null, index));
  }
  onResetClick(event) {
    // Запуск callback для кнопки Reset
    event.preventDefault();
    this.resetListeners.forEach(o => o.call(null));
  }
  onReturnClick(event) {
    // Запуск callback для кнопки Return
    event.preventDefault();
    this.returnListeners.forEach(o => o.call(null));
  }
  addCellClickListener(callback) {
    // Сохранение переданных callback поля для дальнейшего их вызова
    this.cellClickListeners.push(callback);
  }
  addResetListener(callback) {
    // Сохранение переданных callback кнопки Reset для дальнейшего их вызова
    this.resetListeners.push(callback);
  }
  addReturnListener(callback) {
    // Сохранение переданных callback кнопки Return для дальнейшего их вызова
    this.returnListeners.push(callback);
  }
  addMain() {
    // Добавляет поле игры к элементу body
    const body = document.querySelector("body");
    this._createMain();
    body.append(this.conteiner);
    this.createPopup();
    body.append(this.popup);
  }
  addStrike(index) {
    // Добавляет блок с фоном показывающий попадание
    const strikeDiv = document.createElement("div");
    strikeDiv.classList.add("strike");
    this.cells[index].append(strikeDiv);
  }
  removeStrike(element) {
    // Удаляет блок показывающий попадание по цели
    element.children[0].remove();
  }
  createPopup() {
    // Создает popup для страницы
    this.popup = document.createElement("div");
    this.popup.classList.add("popup");
    const div = document.createElement("div");
    div.classList.add("popup_form");
    div.textContent = "Конец игры";
    const span = document.createElement("span");
    this.spanResult = span;
    div.append(span);
    const btn = document.createElement("button");
    btn.textContent = "Reset";
    btn.classList.add("btn_reset");
    div.append(btn);
    btn.addEventListener("click", event => this.onResetClick(event));
    this.popup.append(div);
  }
}
;// CONCATENATED MODULE: ./src/js/firstTask/GameState.js
class GameState {
  constructor() {
    this.index = null;
    this.timer = null;
    this.hole = null;
    this.statusClick = true;
    this.score = 0;
    this.count = 0;
  }
}
;// CONCATENATED MODULE: ./src/js/firstTask/GameController.js


class GameController {
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
    // Callback для события "click" в поле игры
    const hasMole = this.game.cells[index].classList.value;
    if (hasMole.includes("hole__has_mole") && this.gameState.statusClick) {
      this.gameState.statusClick = false;
      this.step -= 10;
      clearInterval(this.gameState.timer);
      this.game.addStrike(index);
      this.gameState.score += 1;
      setTimeout(() => {
        this.gameState.statusClick = true;
        this.game.removeStrike(this.gameState.hole);
        this.gameState.hole.classList.remove("hole__has_mole");
        this.nextStep();
      }, 500);
    }
  }
  onResetClick() {
    // Нажали кнопку reset (перезапуск игры)
    this.game.popup.classList.remove("popup_active");
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
      console.log("Следующий гоблин", this.gameState.count);
      this.gameState.hole.classList.remove("hole__has_mole");
      this.nextIndex(this.game.cells);
      this.gameState.hole = this.game.cells[this.gameState.index];
      this.gameState.hole.classList.add("hole__has_mole");
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
    this.gameState.hole.classList.add("hole__has_mole");
    this.runInterval();
  }
  gameOver() {
    this.gameState.hole.classList.remove("hole__has_mole");
    this.game.popup.classList.add("popup_active");
    this.game.spanResult.textContent = `Ваш результат: ${this.gameState.score}`;
    this.step = 1000;
  }
}
;// CONCATENATED MODULE: ./src/js/secondTask/WindowEdit.js
class WindowEdit {
  constructor() {
    this.conteiner = null;
    this.form = null;
    this.input = null;
    this.divAllTask = null;
    this.divTaskPinned = null;
    this.returnListeners = [];
    this.submitListeners = [];
    this.inputListeners = [];
    this.checkboxListeners = [];
  }
  _createMain() {
    // Создает элемент main содержащий поле задачи
    const main = document.createElement("main");
    main.classList.add("content");
    const mainDiv = document.createElement("div");
    mainDiv.classList.add("content__window");
    main.append(mainDiv);
    const titleTask = document.createElement("h3");
    titleTask.textContent = "TOP Task";
    mainDiv.append(titleTask);
    this.form = document.createElement("form");
    this.form.classList.add("tasks__form");
    this.form.addEventListener("submit", event => this.onSubmit(event));
    mainDiv.append(this.form);
    this.input = document.createElement("input");
    this.input.setAttribute("type", "text");
    this.input.setAttribute("autofocus", "");
    this.input.classList.add("tasks__form__input");
    this.input.addEventListener("input", event => this.onInput(event));
    this.form.append(this.input);
    const titlePinned = document.createElement("h3");
    titlePinned.textContent = "Pinned:";
    mainDiv.append(titlePinned);
    this.divTaskPinned = document.createElement("div");
    this.divTaskPinned.classList.add("pinned");
    mainDiv.append(this.divTaskPinned);
    const titleAllTask = document.createElement("h3");
    titleAllTask.textContent = "All Task:";
    mainDiv.append(titleAllTask);
    this.divAllTask = document.createElement("div");
    this.divAllTask.classList.add("all__tasks");
    mainDiv.append(this.divAllTask);
    this._createButton(main);
    this.conteiner = main;
  }
  _createButton(mainBlock) {
    // Создаем кнопку возврата на главную страницу
    const btn = document.createElement("button");
    btn.textContent = "Return";
    btn.classList.add("btn__return");
    mainBlock.append(btn);
    btn.addEventListener("click", event => this.onReturnClick(event));
  }
  addMain() {
    // Добавляет поле main к элементу body
    const body = document.querySelector("body");
    this._createMain();
    body.append(this.conteiner);
  }
  onReturnClick(event) {
    // Запуск callback для кнопки Return
    event.preventDefault();
    this.returnListeners.forEach(o => o.call(null));
  }
  addReturnListener(callback) {
    // Сохранение переданных callback кнопки Return для дальнейшего их вызова
    this.returnListeners.push(callback);
  }
  onSubmit(event) {
    // Обработчик события поля Form
    event.preventDefault();
    this.submitListeners.forEach(o => o.call(null));
  }
  addSubmitListener(callback) {
    // Сохранение переданных callback поля Form для дальнейшего их вызова
    this.submitListeners.push(callback);
  }
  onInput(event) {
    // Обработчик события поля Input
    event.preventDefault();
    this.inputListeners.forEach(o => o.call(null));
  }
  addInputListener(callback) {
    // Сохранение переданных callback поля Input для дальнейшего их вызова
    this.inputListeners.push(callback);
  }
  onCheckbox(event) {
    // Обработчик события поля задачи (input type=checkbox)
    const task = event.target.nextSibling.textContent;
    this.checkboxListeners.forEach(o => o.call(null, task));
  }
  addCheckboxListener(callback) {
    // Сохранение переданных callback поля Input (type=checkbox)
    this.checkboxListeners.push(callback);
  }
  createTask(value, status) {
    // Создает HTML блок для одной задачи
    const div = document.createElement("div");
    div.classList.add("task");
    const label = document.createElement("label");
    label.classList.add("label__task");
    div.append(label);
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.classList.add("task__checkbox");
    if (status) {
      input.setAttribute("checked", "");
    }
    input.addEventListener("change", event => this.onCheckbox(event));
    label.append(input);
    const span = document.createElement("span");
    span.classList.add("span__text");
    span.textContent = value;
    label.append(span);
    return div;
  }
  errorTask() {
    // Выдает ошибку о пустом поле
    const div = document.createElement("div");
    div.classList.add("error");
    div.textContent = "The field is empty!";
    this.form.append(div);
  }
  drawTasks(array) {
    // Отрисовывает список задач в поле All Task
    this.divAllTask.innerHTML = "";
    if (array.length === 0) {
      this.divAllTask.textContent = "No tasks found";
    } else {
      array.forEach(item => this.divAllTask.append(item));
    }
  }
  drawPinned(array) {
    // Отрисовывает список задач в поле Pinned
    this.divTaskPinned.innerHTML = "";
    if (array.length === 0) {
      this.divTaskPinned.textContent = "No pinned tasks";
    } else {
      array.forEach(item => this.divTaskPinned.append(item));
    }
  }
}
;// CONCATENATED MODULE: ./src/js/secondTask/Task.js
class Task {
  constructor(text) {
    this.text = text;
    this.pinned = false;
  }
}
;// CONCATENATED MODULE: ./src/js/secondTask/WindowController.js


class WindowController {
  constructor(edit) {
    this.edit = edit;
    this.allTasks = [];
  }
  init() {
    this.edit.addMain();
    this.edit.addReturnListener(this.onReturnClick.bind(this));
    this.edit.addSubmitListener(this.onSubmit.bind(this));
    this.edit.addInputListener(this.onInput.bind(this));
    this.edit.addCheckboxListener(this.onCheckbox.bind(this));
    this.showArrayPinned();
    this.showAllTasks();
  }
  onReturnClick() {
    // Нажали кнопку return (возврат в главное меню)
    const body = document.querySelector("body");
    body.innerHTML = "";
    const main = createLinks();
    body.append(main);
  }
  onSubmit() {
    // Обработка события формы Submit (Нажатие кнопки Enter)
    if (this.edit.input.value === "") {
      if (this.edit.form.children.length > 1) {
        return;
      }
      this.edit.errorTask();
      return;
    }
    const status = this.compareAllTasks(this.edit.input.value);
    if (status) {
      return;
    }
    const task = new Task(this.edit.input.value);
    this.allTasks.push(task);
    this.showAllTasks();
    this.edit.input.value = "";
  }
  onInput() {
    // Обработка события ввода текста в поле input
    if (this.edit.form.children.length > 1) {
      this.edit.form.children[1].remove();
    }
    const listFilteredTasks = this.getArrayFilterTasks();
    const array = this.getArrayHtmlTasks(listFilteredTasks);
    this.edit.drawTasks(array);
  }
  onCheckbox(text) {
    // Обработка события нажатия флажка задачи
    const task = this.allTasks.find(item => item.text === text);
    const index = this.allTasks.indexOf(task);
    let status = this.allTasks[index].pinned;
    status = status ? false : true;
    this.allTasks[index].pinned = status;
    this.showArrayPinned();
    const listFilteredTasks = this.getArrayFilterTasks();
    const array = this.getArrayHtmlTasks(listFilteredTasks);
    this.edit.drawTasks(array);
  }
  getArrayHtmlTasks(arrayObject, status = false) {
    // Преобразует список объектов в список HTML элементов
    const array = [];
    arrayObject.forEach(item => {
      const divTask = this.edit.createTask(item.text, status);
      array.push(divTask);
    });
    return array;
  }
  getArrayFilterTasks() {
    // Возвращает отфильтрованный список (без учета задач pinned)
    return this.allTasks.filter(item => {
      if (item.pinned) {
        return false;
      }
      const value = this.edit.input.value.toLowerCase();
      const text = item.text.toLowerCase();
      return text.startsWith(value);
    });
  }
  showArrayPinned() {
    // Отрисовывает Pinned задачи
    const arrayPinned = this.allTasks.filter(item => item.pinned);
    let arrayHtml = this.getArrayHtmlTasks(arrayPinned, true);
    this.edit.drawPinned(arrayHtml);
  }
  showAllTasks() {
    // Отрисовывает задачи поля All Tasks
    const listFilteredTasks = this.allTasks.filter(item => {
      return item.pinned ? false : true;
    });
    const array = this.getArrayHtmlTasks(listFilteredTasks);
    this.edit.drawTasks(array);
  }
  compareAllTasks(value) {
    // Проверка на дублирующиеся задачи (без учета регистра)
    const element = this.allTasks.find(item => {
      const text = item.text.toLowerCase();
      const result = value.toLowerCase();
      return text === result;
    });
    return element ? true : false;
  }
}
;// CONCATENATED MODULE: ./src/js/thirdTask/WindowEdit.js
class WindowEdit_WindowEdit {
  constructor() {
    this.conteiner = null;
    this.inputTitle = null;
    this.inputUrl = null;
    this.divImgs = null;
    this.divError = null;
    this.returnListeners = [];
    this.submitListeners = [];
    this.addListeners = [];
    this.errorLoadListeners = [];
  }
  _createMain() {
    // Создает элемент main содержащий поле задачи
    const main = document.createElement("main");
    main.classList.add("content");
    const mainDiv = document.createElement("div");
    mainDiv.classList.add("conteiner");
    main.append(mainDiv);
    const form = this._createForm();
    mainDiv.append(form);
    this.divImgs = document.createElement("div");
    this.divImgs.classList.add("conteiner__images");
    mainDiv.append(this.divImgs);
    this._createButton(main);
    this.conteiner = main;
  }
  createDivImage() {
    // Создает один блок с фотограффией
    const img = document.createElement("img");
    img.classList.add("image");
    img.setAttribute("src", this.inputUrl.value);
    img.setAttribute("alt", this.inputTitle.value);
    const title = this.inputTitle.value ? this.inputTitle.value : "Noname";
    img.setAttribute("title", title);
    img.addEventListener("load", event => this.onLoad(event));
    img.addEventListener("error", event => this.onErrorLoad(event));
  }
  _createLabelConteiner(input, text) {
    // Создает поле Label для формы заполнения
    const divLabel = document.createElement("div");
    divLabel.classList.add("conteiner__label");
    input.classList.add("conteiner__form__input");
    input.setAttribute("type", "text");
    const label = document.createElement("label");
    label.classList.add("label__title");
    label.textContent = text;
    label.setAttribute("for", input.id);
    divLabel.append(label);
    divLabel.append(input);
    return divLabel;
  }
  _createForm() {
    // Создает поле Form с метками и полями для ввода данных
    const form = document.createElement("form");
    form.classList.add("conteiner__form");
    this.inputTitle = document.createElement("input");
    this.inputTitle.setAttribute("id", "input__title");
    let label = this._createLabelConteiner(this.inputTitle, "Название");
    form.append(label);
    this.inputTitle.setAttribute("autofocus", "");
    this.inputUrl = document.createElement("input");
    this.inputUrl.setAttribute("id", "input__url");
    label = this._createLabelConteiner(this.inputUrl, "Ссылка на изображение");
    form.append(label);
    this.divError = document.createElement("div");
    this.divError.classList.add("conteiner__error");
    form.append(this.divError);
    const button = document.createElement("button");
    button.classList.add("btn__add");
    button.textContent = "Добавить";
    button.setAttribute("type", "submit");
    button.addEventListener("click", event => this.onAddClick(event));
    form.append(button);
    return form;
  }
  _createButton(mainBlock) {
    // Создаем кнопку возврата на главную страницу
    const btn = document.createElement("button");
    btn.textContent = "Return";
    btn.classList.add("btn__return");
    mainBlock.append(btn);
    btn.addEventListener("click", event => this.onReturnClick(event));
  }
  addMain() {
    // Добавляет поле main к элементу body
    const body = document.querySelector("body");
    this._createMain();
    body.append(this.conteiner);
  }
  onLoad(event) {
    // Успешная загрузка фото, добавление фото на доску
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("image__conteiner");
    imgDiv.append(event.target);
    const link = document.createElement("a");
    link.classList.add("image__delete");
    link.textContent = "X";
    link.addEventListener("click", event => this.onRemoveClick(event));
    imgDiv.append(link);
    this.divImgs.append(imgDiv);
    this.divError.textContent = "";
    this.inputTitle.value = null;
    this.inputUrl.value = null;
  }
  onErrorLoad() {
    // Ошибка загрузки фото (Неверный URL)
    this.divError.textContent = "Неверный URL изображения";
  }
  onRemoveClick(event) {
    // Удаляет фотографию при нажатии крестика
    const div = event.target.closest(".image__conteiner");
    div.remove();
  }
  onReturnClick(event) {
    // Запуск callback для кнопки Return
    event.preventDefault();
    this.returnListeners.forEach(o => o.call(null));
  }
  addReturnListener(callback) {
    // Сохранение переданных callback кнопки Return для дальнейшего их вызова
    this.returnListeners.push(callback);
  }
  onAddClick(event) {
    event.preventDefault();
    this.addListeners.forEach(o => o.call(null));
  }
  addButtonAddListener(callback) {
    // Сохранение переданных callback кнопки Return для дальнейшего их вызова
    this.addListeners.push(callback);
  }
}
;// CONCATENATED MODULE: ./src/js/thirdTask/WindowController.js

class WindowController_WindowController {
  constructor(edit) {
    this.edit = edit;
  }
  init() {
    this.edit.addMain();
    this.edit.addReturnListener(this.onReturnClick.bind(this));
    this.edit.addButtonAddListener(this.onAddClick.bind(this));
  }
  onAddClick() {
    // Нажали кнопку Добавить (добавление фото по URL)
    this.edit.createDivImage();
  }
  onReturnClick() {
    // Нажали кнопку return (возврат в главное меню)
    const body = document.querySelector("body");
    body.innerHTML = "";
    const main = createLinks();
    body.append(main);
  }
}
;// CONCATENATED MODULE: ./src/js/welcomePage.js






function createLinks() {
  const main = document.createElement("main");
  main.classList.add("content");
  const listTask = [runTask1, runTask2, runTask3];
  for (let i = 0; i < 3; i += 1) {
    const link = document.createElement("a");
    link.classList.add("link__task");
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
  const edit = new WindowEdit_WindowEdit();
  const controller = new WindowController_WindowController(edit);
  controller.init();
}
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;