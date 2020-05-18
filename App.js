import Baseball from "./Baseball.js";

export default class App {
  $target = null;

  constructor(target) {
    this.$target = target;
    this.render();
  }

  render() {
    new Baseball(this.$target);
  }
}
