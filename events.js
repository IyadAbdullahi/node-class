const Calculator = require("./calculatorClass");
const myCalc = new Calculator();

myCalc.on("timetable", (tablArr) => {
  console.log(tablArr);
  tablArr.forEach((programName) => {
    myCalc.on(programName, (d) => {
      console.log(`The ${programName} of ${d.a} and ${d.b} is ${d.answer}`);
    });
  });
});
myCalc.on("error", (err) => {
  console.log(err);
});

setTimeout(() => {
  myCalc.div(20, 0);
}, 10000);
