const people = ["Aminu", "Saidu", "Kabir", "Sani", "Musa"];
run();
/*
sayHello2("Shams")
  .then((r) => console.log(r))
  .catch((e) => console.log(e));
*/
function sayHello2(name) {
  if (name === "Shams") {
    return Promise.reject("You cant greet yourself");
  } else {
    return Promise.resolve(`Good evening Mr. ${name}, how are you doing?`);
  }
}

async function runSync() {
  const start = process.hrtime();
  try {
    for (let i = 0; i < people.length; i++) {
      const greeting = await sayHello(people[i]);
      console.log(greeting);
    }
    const elapsed = process.hrtime(start);
    const time = (elapsed[0] + elapsed[1] / 1000000000).toFixed(2);
    console.log("Total time : ", time + " secs");
  } catch (err) {
    console.log(err);
    const elapsed = process.hrtime(start);
    const time = (elapsed[0] + elapsed[1] / 1000000000).toFixed(2);
    console.log("Total time : ", time + " secs");
  }
}

function run() {
  const start = process.hrtime();
  for (let i = 0; i < people.length; i++) {
    sayHello(people[i])
      .then((r) => console.log(r))
      .catch((e) => console.log(e))
      .finally(() => console.log("Am not happy with you!!!!!!"));
  }
  const elapsed = process.hrtime(start);
  const time = (elapsed[0] + elapsed[1] / 1000000000).toFixed(2);
  console.log("Total time : ", time + " secs");
}

function sayHello(name) {
  const start = process.hrtime();
  return new Promise((resolve, reject) => {
    const delay = 1000 + Math.ceil(Math.random() * 4000);
    setTimeout(() => {
      if (name === "Shams") {
        const elapsed = process.hrtime(start);
        const time = (elapsed[0] + elapsed[1] / 1000000000).toFixed(2);
        reject(`You can't greet yourself!, took: ${time} secs`);
      }
      const elapsed = process.hrtime(start);
      const time = (elapsed[0] + elapsed[1] / 1000000000).toFixed(2);
      resolve(
        `Good evening Mr. ${name}, how are you doing?, took:${time} secs`
      );
    }, delay);
  });
}
