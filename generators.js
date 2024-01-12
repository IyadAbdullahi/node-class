function getInt() {
  return Math.ceil(Math.random() * 100);
}

//let counter = 0;
function normal() {
  return; //++counter;
}

function* GetIntGen() {
  let counter = 0;
  while (counter < 100) {
    //copy bytes from file A and write to file B
    yield ++counter;
  }
}

function GetIntGen2() {
  let counter = 0;
  while (counter < 100) {
    //copy bytes from file A and write to file B
    console.log("looping...");
    return ++counter;
  }
}

const gen = GetIntGen();

//console.log(gen.next());
//console.log(gen.next());
//console.log(gen.next());
//console.log(gen.next());
//console.log(gen.next());

//console.log(gen.next());
//console.log(gen.next());

for (let i = 0; i < 100; i++) {
  console.log(gen.next());
}
/*
//loop();
for (let i = 0; i < 5; i++) {
  console.log(GetIntGen2());
}
*/
