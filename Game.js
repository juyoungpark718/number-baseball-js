import { createElement, dupCheck, checkEl } from "./shared.js";

class Game {
  $target = null;
  $state = {
    isEnd: false,
    userNumber: 0,
    computerNumber: this.setRandomNum(),
    computerArr: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    computerSelected: [],
  };
  $component = null;

  constructor(target, userNumber) {
    this.$target = target;
    this.$state.userNumber = userNumber;
    this.$component = this.mount();
    this.render();
  }

  setRandomNum() {
    let regExp = /^[1-9]+$/;
    let random = "00";
    while (!regExp.test(random) || random.length !== 3 || !dupCheck(random)) {
      random = String(Math.floor(Math.random() * (1000 - 100 + 1)) + 100);
    }
    return random;
  }

  mount() {
    const player = createElement("div", {
      className: "player",
      id: "computer",
    });
    const comNum = createElement("span", {}, "비밀!");
    const checkTable = createElement("div", { className: "check-table" });
    player.appendChild(comNum);
    player.appendChild(checkTable);

    return player;
  }

  setState(state) {
    Object.keys(state).map((e) => {
      this.$state[e] = state[e];
    });
    this.render();
  }

  compareNumber(num, isUser) {
    let compareNum = isUser
      ? String(this.$state.computerNumber)
      : String(this.$state.userNumber);
    let strike = 0,
      ball = 0,
      out = 0;
    for (let i = 0; i < 3; i++) {
      if (num[i] === compareNum[i]) {
        strike++;
        continue;
      }
      if (compareNum.includes(num[i])) {
        ball++;
        continue;
      }
      out++;
    }
    return {
      result: { strike: strike, ball: ball, out: out },
      isFind: strike === 3 ? true : false,
      print: `${strike} Strike , ${ball} Ball , ${out} Out`,
    };
  }

  computerSubmit() {
    const comTable = this.$target.getElementsByClassName("check-table")[1];
    let arr = [...this.$state.computerArr];
    let expectNumber = "000";
    while (
      !dupCheck(expectNumber) &&
      !this.$state.computerSelected.includes(expectNumber)
    ) {
      expectNumber =
        arr[Math.ceil(Math.random() * arr.length) - 1] +
        arr[Math.ceil(Math.random() * arr.length) - 1] +
        arr[Math.ceil(Math.random() * arr.length) - 1];
    }
    const result = this.compareNumber(expectNumber, false);
    comTable.appendChild(checkEl(expectNumber, result.print));
    if (result.result.strike === 3) {
      alert(
        `컴퓨터가 ${expectNumber}가 정답이라고 확신했습니다! 컴퓨터는 ${comTable.children.length}번만에 맞췄고 당신은 패배했습니다.!`
      );
      location.reload();
    }
    if (result.result.ball === 3) {
      this.$state.computerArr = expectNumber.split("");
    }
    if (result.result.out === 3) {
      for (let i = 0; i < 3; i++) {
        arr = arr.filter((e) => e != expectNumber[i]);
      }
      this.$state.computerArr = [...arr];
    }
    this.$state.computerSelected.push(expectNumber);
    console.log(this.$state.computerArr, this.$state.computerSelected);
  }

  handleSubmit() {
    const user = this.$target.getElementsByClassName("player")[0].children[1];
    const userTable = this.$target.getElementsByClassName("check-table")[0];
    const inputEl = user.children[0];

    if (inputEl.value.length === 3) {
      const result = this.addCheckEl(userTable, inputEl.value, true);
      if (result) {
        alert(
          `${inputEl.value}가 정답입니다! ${userTable.children.length}번만에 맞추셨습니다!`
        );
        location.reload();
      }
      inputEl.value = "";
      this.computerSubmit();
    } else {
      alert("세자리 숫자를 입력해주세요!");
    }
  }

  addCheckEl(target, value, isUser) {
    const result = this.compareNumber(value, isUser);
    const data = checkEl(value, result.print);
    target.appendChild(data);
    if (result.isFind) return true;
    return false;
  }

  start() {
    const user = this.$target.getElementsByClassName("player")[0].children[1];
    const submitBtn = user.children[1];
    submitBtn.addEventListener("click", () => this.handleSubmit());
    console.log(this.$state.computerNumber);
  }

  render() {
    this.$target.appendChild(this.$component);
  }
}

export default Game;
