import createLinks from "../welcomePage";
// import Task from "./Task";

export default class WindowController {
  constructor(edit) {
    this.edit = edit;
    // this.allTasks = [];
  }

  init() {
    this.edit.addMain();
    this.edit.addReturnListener(this.onReturnClick.bind(this));
    this.edit.addSubmitListener(this.onSubmit.bind(this));
    // this.edit.addInputListener(this.onInput.bind(this));
    // this.edit.addCheckboxListener(this.onCheckbox.bind(this));

    // this.showArrayPinned();
    // this.showAllTasks();
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

  // onInput() {
  //   // Обработка события ввода текста в поле input
  //   if (this.edit.form.children.length > 1) {
  //     this.edit.form.children[1].remove();
  //   }
  //   const listFilteredTasks = this.getArrayFilterTasks();
  //   const array = this.getArrayHtmlTasks(listFilteredTasks);
  //   this.edit.drawTasks(array);
  // }

  // onCheckbox(text) {
  //   // Обработка события нажатия флажка задачи
  //   const task = this.allTasks.find((item) => item.text === text);
  //   const index = this.allTasks.indexOf(task);
  //   let status = this.allTasks[index].pinned;
  //   status = status ? false : true;
  //   this.allTasks[index].pinned = status;

  //   this.showArrayPinned();

  //   const listFilteredTasks = this.getArrayFilterTasks();
  //   const array = this.getArrayHtmlTasks(listFilteredTasks);
  //   this.edit.drawTasks(array);
  // } 
}
