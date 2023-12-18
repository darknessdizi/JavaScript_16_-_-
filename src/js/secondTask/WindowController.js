import createLinks from "../welcomePage";
import Task from "./Task";

export default class WindowController {
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

    const arrayAllTasks = this.allTasks.filter((item) => {
      return item.pinned ? false : true;
    });
    const arrayHtml = this.getArrayHtmlTasks(arrayAllTasks);
    this.edit.drowTasks(arrayHtml);
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
      if (this.edit.form.children.length > 1) {
        return;
      }
      this.edit.errorTask();
      return;
    }

    const status = this.compareAllTask(this.edit.input.value);
    if (status) {
      return;
    }
    const task = new Task(this.edit.input.value);
    this.allTasks.push(task);

    const array = this.getArrayHtmlTasks(this.allTasks);
    this.edit.drowTasks(array);
    this.edit.input.value = '';
  }

  onInput() {
    // Обработка события ввода текста в поле input
    if (this.edit.form.children.length > 1) {
      this.edit.form.children[1].remove();
    }
    const arrayFilter = this.getArrayFilter();
    const array = this.getArrayHtmlTasks(arrayFilter);
    this.edit.drowTasks(array);
  }

  onCheckbox(text) {
    // Обработка события нажатия флажка задачи
    const task = this.allTasks.find((item) => item.text === text);
    const index = this.allTasks.indexOf(task);
    let status = this.allTasks[index].pinned;
    status = status ? false : true;
    this.allTasks[index].pinned = status;

    this.showArrayPinned();

    const arrayFilter = this.getArrayFilter();
    const array = this.getArrayHtmlTasks(arrayFilter);
    this.edit.drowTasks(array);
  }

  getArrayHtmlTasks(arrayObject, status = false) {
    // Преобразует список объектов в список HTML элементов
    const array = [];
    arrayObject.forEach((item) => {
      const divTask = this.edit.createTask(item.text, status);
      array.push(divTask);
    });
    return array;
  }

  getArrayFilter() {
    // Возвращает отфильтрованный список (без учета задач pinned)
    return this.allTasks.filter((item) => {
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
    const arrayPinned = this.allTasks.filter((item) => item.pinned);
    let arrayHtml = this.getArrayHtmlTasks(arrayPinned, true);
    this.edit.drowPinned(arrayHtml);
  }

  compareAllTask(value) {
    // Проверка на дублирующиеся задачи (без учета регистра)
    const element = this.allTasks.find((item) => {
      const text = item.text.toLowerCase();
      const result = value.toLowerCase();
      return text === result;
    });
    return element ? true : false;
  }
}
