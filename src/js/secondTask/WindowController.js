import createLinks from "../welcomePage";

export default class WindowController {
  constructor(edit) {
    this.edit = edit;
  }

  init() {
    this.edit.addMain();
    this.edit.addReturnListener(this.onReturnClick.bind(this));
  }

  onReturnClick() {
    // Нажали кнопку return (возврат в главное меню)
    const body = document.querySelector('body');
    body.innerHTML = '';
    const main = createLinks();
    body.append(main);
  }
}