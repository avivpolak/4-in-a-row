/**
 * Links the user input and the view output.
 *
 * @format
 * @class Controller
 * @param model
 * @param view
 */
import { View } from "./view";
import { Model } from "./model";
export class Controller {
  #model;
  #view;
  constructor() {
    this.#model = new Model(6, 8);
    this.#view = new View();
    //console.log(this.#model.playEvent.addListener);
    this.#view.playEvent.addListener((move) => {
      this.#model.play(move);
    });
    this.#model.victoryEvent.addListener((winner) => this.#view.victory(winner));
    this.#model.drawEvent.addListener(() => this.#view.draw());
    this.#model.updateEvent.addListener((board) => this.#view.render(board));
  }
  run() {
    this.#view.render(this.#model.board);
  }
}
