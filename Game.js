class Game {
  $target = null;
  state = {
    isGame: false,
  };

  constructor(target) {
    this.$target = target;
    console.log(this.$target);
    this.render();
  }

  setState(state) {
    Object.keys(state).map((e) => {
      this.$state[e] = state[e];
    });
    this.render();
  }

  start() {}

  render() {}
}

export default Game;
