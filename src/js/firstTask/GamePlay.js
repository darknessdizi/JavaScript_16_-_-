export default class GamePlay {
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
    mainDiv.classList.add("hole-game");
    main.append(mainDiv);

    for (let i = 0; i < this.boardsize; i += 1) {
      const element = document.createElement("div");
      element.classList.add("hole");
      mainDiv.append(element);

      element.addEventListener('click', (event) => this.onCellClick(event));
      this.cells.push(element);
    }
    this._createButton(main);

    this.conteiner = main;
  }

  _createButton(mainBlock) {
    // Создаем кнопку возврата на главную страницу
    const btn = document.createElement('button');
    btn.textContent = 'Return';
    btn.classList.add('btn-return');
    mainBlock.append(btn);
    btn.addEventListener('click', (event) => this.onReturnClick(event));
  }

  onCellClick(event) {
    // Запуск сохраненных callback из списка для текущего индекса
    const index = this.cells.indexOf(event.currentTarget);
    this.cellClickListeners.forEach((o) => o.call(null, index));
  }

  onResetClick(event) {
    // Запуск callback для кнопки Reset
    event.preventDefault();
    this.resetListeners.forEach((o) => o.call(null));
  }

  onReturnClick(event) {
    // Запуск callback для кнопки Return
    event.preventDefault();
    this.returnListeners.forEach((o) => o.call(null));
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
    const strikeDiv = document.createElement('div');
    strikeDiv.classList.add("strike");
    this.cells[index].append(strikeDiv);
  }

  removeStrike(element) {
    // Удаляет блок показывающий попадание по цели
    element.children[0].remove();
  }

  createPopup() {
    // Создает popup для страницы
    this.popup = document.createElement('div');
    this.popup.classList.add('popup');
    const div = document.createElement('div');
    div.classList.add('popup-form');
    div.textContent = 'Конец игры';
    const span = document.createElement('span');
    this.spanResult = span;
    div.append(span);
    const btn = document.createElement('button');
    btn.textContent = 'Reset';
    btn.classList.add('btn-reset');
    div.append(btn);

    btn.addEventListener('click', (event) => this.onResetClick(event));

    this.popup.append(div);
  }
}
