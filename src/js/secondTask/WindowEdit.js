export default class WindowEdit {
  constructor() {
    this.conteiner = null;
    this.returnListeners = [];
  }

  _createMain() {
    // Создает элемент main содержащий поле игры
    const main = document.createElement("main");
    main.classList.add("content");
    const mainDiv = document.createElement("div");
    mainDiv.classList.add("content-window");
    main.append(mainDiv);

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

  addMain() {
    // Добавляет поле main к элементу body
    const body = document.querySelector("body");
    this._createMain();
    body.append(this.conteiner);
  }

  onReturnClick(event) {
    // Запуск callback для кнопки Return
    event.preventDefault();
    this.returnListeners.forEach((o) => o.call(null));
  }

  addReturnListener(callback) {
    // Сохранение переданных callback кнопки Return для дальнейшего их вызова
    this.returnListeners.push(callback);
  }
}