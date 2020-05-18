import Game from "./Game.js";
import { createElement } from "./shared.js";

class Baseball {
  $target = null;
  $state = {
    isSelect: false,
    selected: "",
  };
  $component = null;

  constructor(target) {
    this.$target = target;
    this.$component = this.mount();
    this.render();
  }

  mount() {
    const playerContainer = createElement("div", { id: "playerContainer" });
    const player = createElement("div", { className: "player", id: "user" });
    const inputEl = createElement("input", {
      id: "userNumber",
      type: "text",
      readOnly: this.$state.isSelect ? true : false,
      placeholder: "숫자를 입력해주세요.",
      value: this.$state.selected,
    });
    const selectBtn = createElement(
      "button",
      { id: "selectBtn" },
      this.$state.isSelect ? "수정" : "결정"
    );
    const startBtn = createElement("button", { id: "startBtn" }, "시작하기");
    startBtn.addEventListener("click", () => this.handleStart());
    inputEl.addEventListener("input", (e) => this.handleInput(e));
    selectBtn.addEventListener("click", () => this.handleSelect());
    player.appendChild(inputEl);
    player.appendChild(selectBtn);
    this.$state.isSelect ? player.appendChild(startBtn) : null;
    playerContainer.appendChild(player);

    return playerContainer;
  }

  handleInput(event) {
    const regExp = /^[1-9]*$/;
    const input = event.target;
    if (input.value.length === 4)
      input.value = input.value.slice(0, input.value.length - 1);
    else {
      if (!regExp.test(input.value)) {
        alert("숫자를 입력해주세요.");
        input.value = "";
      }
    }
  }

  setState(state) {
    Object.keys(state).map((e) => {
      this.$state[e] = state[e];
    });
    this.render();
  }

  handleSelect() {
    const input = document.getElementById("userNumber");
    if (input.value.length === 3) {
      if (this.$state.isSelect) {
        this.setState({
          isSelect: false,
        });
      } else {
        this.setState({
          isSelect: true,
          selected: input.value,
        });
      }
    } else {
      alert("세 자리 숫자를 입력해주세요.");
    }
  }

  async handleStart() {
    await new Game(this.$component);
  }

  render() {
    if (this.$target.contains(this.$component)) {
      this.$target.removeChild(this.$component);
      this.$component = this.mount();
    }
    this.$target.appendChild(this.$component);
  }
}

export default Baseball;
