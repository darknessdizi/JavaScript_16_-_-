import createLinks from "../welcomePage";

export default class WindowController {
  constructor(edit) {
    this.edit = edit;
  }

  init() {
    this.edit.addMain();
    this.edit.addReturnListener(this.onReturnClick.bind(this));
    this.edit.addSubmitListener(this.onSubmit.bind(this));
    this.edit.addInputListener(this.onInput.bind(this));
  }

  onReturnClick() {
    // Нажали кнопку return (возврат в главное меню)
    const body = document.querySelector('body');
    body.innerHTML = '';
    const main = createLinks();
    body.append(main);
  }

  onSubmit() {
    // Обработка события формы Submit (Нажатие кнопки Enter)
    if (this.edit.input.value === '') {
      this.edit.errorTask();
      return;
    }
    const task = this.edit.createTask();
    task.innerHTML = this.edit.input.value;
    this.edit.divAllTask.append(task);
    this.edit.input.value = '';
  }

  onInput() {
    // Обработка события ввода текста в поле input
    console.log('input');
  }
}