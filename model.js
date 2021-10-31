/**
 * @format
 * @class Model Manages the data of the application.
 */
import { Event } from "./event";
export class Model {
  board;
  #width;
  #height;
  #correntPlayer;
  #finishGame;
  playEvent;
  victoryEvent;
  drawEvent;
  updateEvent;
  constructor(width, height) {
    this.playEvent = new Event();
    this.victoryEvent = new Event();
    this.drawEvent = new Event();
    this.updateEvent = new Event();

    this.board = Array(height * width).fill("");
    this.#width = width;
    this.#height = height;
    this.#correntPlayer = "😎";
    this.#finishGame = false;
  }

  // get board() {
  //   return this.#board;
  // }
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
  // set board([index, value]) {
  //   this.#board[index] = value;
  // }
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

    // if (check()) {
    //   this.victoryEvent.trigger(this.correntPlayer);
    // }

    return check();
  }
  //check draw
  draw() {
    if (this.board.every((i) => i)) this.drawEvent.trigger();
    return this.board.every((i) => i);
  }
  //switch playars
  switchPlayer() {
    //console.log(this.correntPlayer === "😎");
    if (this.correntPlayer === "😎") {
      this.correntPlayer = "🏃‍♂️";
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

    this.board[i] = this.correntPlayer;

    if (this.victory()) {
      this.victoryEvent.trigger(this.correntPlayer);
    }
    if (this.board.every((i) => i)) {
      this.drawEvent.trigger();
    }
    //send the board to view)
    this.switchPlayer();
    this.updateEvent.trigger(this.board);
  }
  //finishGameFlag
}
