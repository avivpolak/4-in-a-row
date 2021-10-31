/** @format */

export class Event {
  constructor() {
    this.listeners = [];
  }
  addListener(listener) {
    this.listeners.push(listener);
  }
  trigger(params) {
    //this.listeners[0]();
    //console.log(params);
    this.listeners.forEach((listener) => {
      listener(params);
    });
  }
}
