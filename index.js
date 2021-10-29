/**
 * @format
 * @class Model Manages the data of the application.
 */

class Model {
  #board;
  #width;
  #height;
  #correntPlayer;
  constractor(width, height) {
    this.playEvent = new Event();
    this.victoryEvent = new Event();
    this.drawEvent = new Event();
    this.updateEvent = new Event();
    this.#board = Array(height * width).fill();
    this.#width = width;
    this.#height = height;
    this.#correntPlayer = "😎";
    this.#finishGame = false;
  }
  get board() {
    return this.#board;
  }
  get width() {
    return this.#width;
  }
  get height() {
    return this.#height;
  }
  get correntPlayer() {
    return this.#correntPlayer;
  }
  get finishGame() {
    return this.#finishGame;
  }
  set board([index, value]) {
    this.#board[index] = value;
  }
  set width(width) {
    this.#width = width;
  }
  set height(height) {
    this.#height = height;
  }
  set correntPlayer(correntPlayer) {
    this.#correntPlayer = correntPlayer;
  }
  set finishGame(finishGame) {
    this.#finishGame = finishGame;
  }

  #checkFour(a, b, c, d) {
    if (
      this.board[a] &&
      this.board[a] === this.board[b] &&
      this.board[b] === this.board[c] &&
      this.board[c] === this.board[d]
    ) {
      return true;
    }
  }

  //check victory
  victory() {
    const check = () => {
      // horizontalCheck
      for (let j = 0; j < this.height; j++) {
        for (let i = 0; i < this.width - 3; i++) {
          let first = j * this.width + i;
          let second = j * this.width + i + 1;
          let theard = j * this.width + i + 2;
          let fourth = j * this.width + i + 3;

          if (this.#checkFour(first, second, theard, fourth)) {
            return true;
          }
        }
      }

      // verticalCheck
      for (let i = 0; i < this.width; i++) {
        for (let j = 0; j < this.height - 3; j++) {
          let first = j * this.width + i;
          let second = (j + 1) * this.width + i;
          let theard = (j + 2) * this.width + i;
          let fourth = (j + 3) * this.width + i;

          if (this.#checkFour(first, second, theard, fourth)) {
            return true;
          }
        }
      }
      // ascendingDiagonalCheck
      for (let j = 0; j < this.height - 3; j++) {
        for (let i = 0; i < this.width - 3; i++) {
          let first = j * this.width + i;
          let second = (j + 1) * this.width + i + 1;
          let theard = (j + 2) * this.width + i + 2;
          let fourth = (j + 3) * this.width + i + 3;

          if (this.#checkFour(first, second, theard, fourth)) {
            return true;
          }
        }
      }
      //DECENDING DiagonalCheck
      for (let j = 0; j < this.height - 3; j++) {
        for (let i = 3; i < this.width; i++) {
          let first = j * this.width + i;
          let second = (j + 1) * this.width + i - 1;
          let theard = (j + 2) * this.width + i - 2;
          let fourth = (j + 3) * this.width + i - 3;

          if (this.#checkFour(first, second, theard, fourth)) {
            return true;
          }
        }
      }
    };

    if (check()) {
      this.victoryEvent.trigger(this.currentPlayer);
    }

    return check();
  }
  //check draw
  draw() {
    if (this.board.every((i) => i)) this.drawEvent.trigger();
    return this.board.every((i) => i);
  }
  //switch playars
  switchPlayer() {
    if (this.correntPlayer === "😎") {
      this.correntPlayer = "🐱‍👤";
    } else {
      this.correntPlayer = "😎";
    }
  }
  //play(move)
  play(i) {
    if (i < 0 || i > this.height * this.width - 1) return;
    while (i <= this.width * (this.height - 1) - 1 && !this.board[i + this.width]) {
      i += this.width;
    }
    this.board = [i, this.currentPlayer];
    if (this.victory || this.draw) {
      this.finishGame = true;
      return; ///finish the game
    }
    this.updateEvent.trigger(this.board);
    //send the board to view)
    this.switchPlayer();
  }
  //finishGameFlag
}

/**
 * @class View
 *
 * Visual representation of the model.
 */
class View {
  //constractor()
  //
  //static create element
  static createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
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
    document.body.innerHTML = createBoard(board);
  }

  createBoard(board) {
    let table = createElement("div");

    this.cells = Array(board.length)
      .fill()
      .map((element, i) => {
        const cell = this.createElement(
          "div",
          [],
          ["cell"],
          {},
          { click: this.playEvent.trigger(i) }
        );
        if (element) {
          cell.append(element);
        }
        table.append(cell);
      });
  }
  victory(winner) {
    alert(`${winner} is the winner!`);
  }
  draw() {
    alert(`its a draw`);
  }
  //events
}

/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
class Controller {
  #model;
  #view;
  constructor() {
    this.#model = new Model(10, 6);
    this.#view = new View();
    this.#view.playEvent.addListener((move) => {
      this.#model.play(move);
    });
    this.#model.victoryEvent.addListener((winner) => this.view.victory(winner));
    this.#model.drawEvent.addListener(() => this.view.drawEvent());
    this.#model.updateEvent.addListener((board) => this.view.render(board));
  }
}
class Event {
  constructor() {
    this.listeners = [];
  }
  addListener(listener) {
    this.listeners.push(listener);
  }
  trigger(params) {
    this.listeners.forEach((listener) => {
      listener(params);
    });
  }
}

//create board->creat data,row,table
//   createBoard(board) {
//     let table = createElement("table", [], [], {}, { click: "handleClick" });
//     for (let i = 0; i < board.length; i++) {
//       let tr = createElement("tr");
//       for (let j = 0; j < board[i].length; j++) {
//         let td = createElement("td", [], ["cell"], { "data-loaction": [j, i] }); //width/height
//         if (board[i][j]) {
//           td.append(board[i][j]);
//         }
//         tr.append(td);
//       }
//       table.append(tr);
//     }
//     return table;
//   }
