export default class WindowEdit {
  constructor() {
    this.conteiner = null;
    this.input = null;
    this.divAllTask = null;
    this.divTaskPinned = null;
    this.returnListeners = [];
    this.submitListeners = [];
    this.inputListeners = [];
  }

  _createMain() {
    // Создает элемент main содержащий поле задачи
    const main = document.createElement("main");
    main.classList.add("content");
    const mainDiv = document.createElement("div");
    mainDiv.classList.add("content-window");
    main.append(mainDiv);

    const titleTask = document.createElement('h3');
    titleTask.textContent = 'TOP Task';
    mainDiv.append(titleTask);

    const form = document.createElement('form');
    form.addEventListener('submit', (event) => this.onSubmit(event));
    mainDiv.append(form);

    this.input = document.createElement('input');
    this.input.setAttribute('type', 'text');
    this.input.addEventListener('input', (event) => this.onInput(event));
    form.append(this.input);

    const titlePinned = document.createElement('h3');
    titlePinned.textContent = 'Pinned:';
    mainDiv.append(titlePinned);

    this.divTaskPinned = document.createElement('div');
    this.divTaskPinned.classList.add('pinned');
    mainDiv.append(this.divTaskPinned);

    const titleAllTask = document.createElement('h3');
    titleAllTask.textContent = 'All Task:';
    mainDiv.append(titleAllTask);

    this.divAllTask = document.createElement('div');
    this.divAllTask.classList.add('all__tasks');
    mainDiv.append(this.divAllTask);

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

  onSubmit(event) {
    event.preventDefault();
    this.submitListeners.forEach((o) => o.call(null));
  }

  addSubmitListener(callback) {
    // Сохранение переданных callback поля Form для дальнейшего их вызова
    this.submitListeners.push(callback);
  }

  onInput(event) {
    event.preventDefault();
    this.inputListeners.forEach((o) => o.call(null));
  }

  addInputListener(callback) {
    // Сохранение переданных callback поля Input для дальнейшего их вызова
    this.inputListeners.push(callback);
  }

  createTask() {
    const div = document.createElement('div');
    div.classList.add('task');
    return div;
  }

  errorTask() {
    const div = document.createElement('div');
    div.classList.add('error');
    div.textContent = 'The field is empty!';
    const form = this.conteiner.querySelector('form');
    form.append(div);
    setTimeout(() => {
      div.remove();
    }, 2000)
  }
}