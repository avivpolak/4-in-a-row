/**
 * Visual representation of the model.
 *
 * @format
 * @class View
 */
import { Event } from "./event";

export class View {
  constructor() {
    this.playEvent = new Event();
  }
  //
  //static create element
  createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
    let el = document.createElement(tagName);
    //Adding children
    for (const child of children) {
      el.append(child);
    }
    //Adding classes
    for (const cls of classes) {
      el.classList.add(cls);
    }
    //Adding attributes
    for (const attr in attributes) {
      el.setAttribute(attr, attributes[attr]);
    }
    //Adding events
    for (const event in eventListeners) {
      el.addEventListener(event, eventListeners[event]);
    }
    return el;
  }

  //render board
  render(board) {
    document.getElementById("main").innerHTML = "";
    document.getElementById("main").append(this.createBoard(board));
    this.createBoard3d(board);
  }

  createBoard() {
    let table = this.createElement("div", [], ["board"]);

    this.cells = Array(6)
      .fill()
      .map((element, i) => {
        const cell = this.createElement("div", [], ["cell"]);
        cell.addEventListener("click", () => {
          this.playEvent.trigger(i);
        });

        if (element) {
          cell.append(element);
        }
        table.append(cell);
      });
    return table;
  }
  createBoard3d(board) {
    getBoard3d(board);
  }
  victory(winner) {
    alert(`${winner} is the winner!`);
  }
  draw() {
    alert(`its a draw`);
  }
}
