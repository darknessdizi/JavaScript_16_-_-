export default class WindowEdit {
  constructor() {
    this.conteiner = null;
    // this.form = null;
    // this.input = null;
    // this.divAllTask = null;
    // this.divTaskPinned = null;
    this.returnListeners = [];
    this.submitListeners = [];
    // this.inputListeners = [];
    // this.checkboxListeners = [];
  }

  _createMain() {
    // Создает элемент main содержащий поле задачи
    const main = document.createElement("main");
    main.classList.add("content");
    const mainDiv = document.createElement("div");
    mainDiv.classList.add("content-conteiner");
    main.append(mainDiv);

    const form = document.createElement("form");
    form.classList.add("conteiner__form");
    mainDiv.append(form);

    const divLabel = document.createElement('div');
    divLabel.classList.add('conteiner-label');
    form.append(divLabel);

    const input = document.createElement("input");
    input.classList.add("conteiner__form__input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "input__title");

    const label = document.createElement("label");
    label.classList.add("label__title");
    label.textContent = "Название";
    label.setAttribute("for", input.id);
    divLabel.append(label);
    divLabel.append(input);

    const divLabel2 = document.createElement('div');
    divLabel2.classList.add('conteiner-label');
    form.append(divLabel2);

    const input2 = document.createElement("input");
    input2.classList.add("conteiner__form__input");
    input2.setAttribute("type", "text");
    input2.setAttribute("id", "input__url");

    const label2 = document.createElement("label");
    label2.classList.add("label__title");
    label2.textContent = "Ссылка на изображение";
    label2.setAttribute("for", input2.id);
    divLabel2.append(label2);
    divLabel2.append(input2);

    const button = document.createElement('button');
    button.classList.add('btn-add');
    button.textContent = 'Добавить';
    button.setAttribute('type', 'submit');
    form.append(button);

    const divImgs = document.createElement("div");
    divImgs.classList.add("conteiner__imgs");
    mainDiv.append(divImgs);

    const img = document.createElement('img');
    img.src = 'https://i.yapx.cc/R6vJI.jpg';
    divImgs.append(img);
    // const titleTask = document.createElement("h3");
    // titleTask.textContent = "TOP Task";
    // mainDiv.append(titleTask);

    // this.form = document.createElement("form");
    // this.form.classList.add("tasks__form");
    // this.form.addEventListener("submit", (event) => this.onSubmit(event));
    // mainDiv.append(this.form);

    // this.input = document.createElement("input");
    // this.input.setAttribute("type", "text");
    // this.input.setAttribute("autofocus", "");
    // this.input.classList.add("tasks__form__input");
    // this.input.addEventListener("input", (event) => this.onInput(event));
    // this.form.append(this.input);

    // const titlePinned = document.createElement("h3");
    // titlePinned.textContent = "Pinned:";
    // mainDiv.append(titlePinned);

    // this.divTaskPinned = document.createElement("div");
    // this.divTaskPinned.classList.add("pinned");
    // mainDiv.append(this.divTaskPinned);

    // const titleAllTask = document.createElement("h3");
    // titleAllTask.textContent = "All Task:";
    // mainDiv.append(titleAllTask);

    // this.divAllTask = document.createElement("div");
    // this.divAllTask.classList.add("all__tasks");
    // mainDiv.append(this.divAllTask);

    this._createButton(main);
    this.conteiner = main;
  }

  _createButton(mainBlock) {
    // Создаем кнопку возврата на главную страницу
    const btn = document.createElement("button");
    btn.textContent = "Return";
    btn.classList.add("btn-return");
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

  // onInput(event) {
  //   // Обработчик события поля Input
  //   event.preventDefault();
  //   this.inputListeners.forEach((o) => o.call(null));
  // }

  // addInputListener(callback) {
  //   // Сохранение переданных callback поля Input для дальнейшего их вызова
  //   this.inputListeners.push(callback);
  // }

  // onCheckbox(event) {
  //   // Обработчик события поля задачи (input type=checkbox)
  //   const task = event.target.nextSibling.textContent;
  //   this.checkboxListeners.forEach((o) => o.call(null, task));
  // }

  // addCheckboxListener(callback) {
  //   // Сохранение переданных callback поля Input (type=checkbox)
  //   this.checkboxListeners.push(callback);
  // }
}
