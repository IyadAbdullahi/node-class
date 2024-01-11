const { EventEmitter } = require("events");

class Calculator extends EventEmitter {
  constructor() {
    super();
    this.#timetable();
  }

  #loop() {
    setInterval(() => {
      let a = Math.ceil(Math.random() * 100);
      let b = 100 + Math.ceil(Math.random() * 500);
      this.add(a, b);
      this.mul(a, b);
      this.sub(a, b);
      this.div(a, b);
    }, 2000);
  }

  #timetable() {
    setTimeout(() => {
      this.emit("timetable", ["sum", "mul", "sub", "div"]);
      this.#loop();
    }, 3000);
  }

  add(a, b) {
    const ans = {
      a,
      b,
      answer: a + b,
    };
    this.emit("sum", ans);
  }

  mul(a, b) {
    const ans = {
      a,
      b,
      answer: a * b,
    };
    this.emit("mul", ans);
  }

  sub(a, b) {
    const ans = {
      a,
      b,
      answer: a - b,
    };
    this.emit("sub", ans);
  }

  div(a, b) {
    if (b === 0) {
      this.emit("error", "Division by there not allowed !");
    } else {
      const ans = {
        a,
        b,
        answer: a / b,
      };
      this.emit("div", ans);
    }
  }
}

module.exports = Calculator;
