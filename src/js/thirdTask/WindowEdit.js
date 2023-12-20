export default class WindowEdit {
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
    img.addEventListener("load", (event) => this.onLoad(event));
    img.addEventListener("error", (event) => this.onErrorLoad(event));
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
    button.addEventListener("click", (event) => this.onAddClick(event));
    form.append(button);
    return form;
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

  onLoad(event) {
    // Успешная загрузка фото, добавление фото на доску
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("image__conteiner");
    imgDiv.append(event.target);

    const link = document.createElement("a");
    link.classList.add("image__delete");
    link.textContent = "X";
    link.addEventListener("click", (event) => this.onRemoveClick(event));
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
    this.returnListeners.forEach((o) => o.call(null));
  }

  addReturnListener(callback) {
    // Сохранение переданных callback кнопки Return для дальнейшего их вызова
    this.returnListeners.push(callback);
  }

  onAddClick(event) {
    event.preventDefault();
    this.addListeners.forEach((o) => o.call(null));
  }

  addButtonAddListener(callback) {
    // Сохранение переданных callback кнопки Return для дальнейшего их вызова
    this.addListeners.push(callback);
  }
}
