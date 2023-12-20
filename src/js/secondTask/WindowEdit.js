export default class WindowEdit {
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
    this.form.addEventListener("submit", (event) => this.onSubmit(event));
    mainDiv.append(this.form);

    this.input = document.createElement("input");
    this.input.setAttribute("type", "text");
    this.input.setAttribute("autofocus", "");
    this.input.classList.add("tasks__form__input");
    this.input.addEventListener("input", (event) => this.onInput(event));
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
    btn.addEventListener("click", (event) => this.onReturnClick(event));
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
    // Обработчик события поля Form
    event.preventDefault();
    this.submitListeners.forEach((o) => o.call(null));
  }

  addSubmitListener(callback) {
    // Сохранение переданных callback поля Form для дальнейшего их вызова
    this.submitListeners.push(callback);
  }

  onInput(event) {
    // Обработчик события поля Input
    event.preventDefault();
    this.inputListeners.forEach((o) => o.call(null));
  }

  addInputListener(callback) {
    // Сохранение переданных callback поля Input для дальнейшего их вызова
    this.inputListeners.push(callback);
  }

  onCheckbox(event) {
    // Обработчик события поля задачи (input type=checkbox)
    const task = event.target.nextSibling.textContent;
    this.checkboxListeners.forEach((o) => o.call(null, task));
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
    input.addEventListener("change", (event) => this.onCheckbox(event));
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
      array.forEach((item) => this.divAllTask.append(item));
    }
  }

  drawPinned(array) {
    // Отрисовывает список задач в поле Pinned
    this.divTaskPinned.innerHTML = "";
    if (array.length === 0) {
      this.divTaskPinned.textContent = "No pinned tasks";
    } else {
      array.forEach((item) => this.divTaskPinned.append(item));
    }
  }
}
