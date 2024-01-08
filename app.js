const { promisify } = require("util");

const addDeleyPromisify = promisify(addDelay);
/*
addDelay(a,b,(err,result)=>{
    if(err){
        console.log(err);
    }else{
        console.log(result)
    }
});
*/

//delegation
let a = 32;
/*
addDelay(a,(err,result)=>{
    console.log(`Result >> `,result);
    addDelay(result,(err1,result1)=>{
        console.log(`Result1 >> `,result1);
        addDelay(result1,(err2,result2)=>{
            console.log(`Result2 >> `,result2);
            addDelay(result2,(err3,result3)=>{
                console.log(`Result3 >> `,result3);
                addDelay(result3,(err4,result4)=>{
                    if(err4){
                        console.log(err4);
                    }else{
                        console.log("Finally: >> ",result4);
                    }
                })
            })
        })
    })
});
*/
addDeleyPromisify(a)
  .then((b) => {
    console.log("Result 1: ", b);
    return addDeleyPromisify(b);
  })
  .then((b) => {
    console.log("Result 2: ", b);
    return addDeleyPromisify(b);
  })
  .then((b) => {
    console.log("Result 3: ", b);
    return addDeleyPromisify(b);
  })
  .then((b) => {
    console.log("Result 4: ", b);
    return addDeleyPromisify(b);
  })
  .catch((err) => {
    console.log("Theres an error >> ", err);
  });

function addDelay(a, cb) {
  setTimeout(() => {
    if (a % 2 == 1) {
      cb(null, `Decimal not allowed ${a / 2}`);
    } else {
      cb(a / 2, null);
    }
  }, 5000);
}

//console.log(divSync(a,b));
/*
add(a,b,(err,result)=>{
    if(err){
        console.log(err);
    }else{
        console.log(result)
    }
});

div(a,b,(err,result)=>{
    if(err){
        console.log(err);
    }else{
        console.log(result)
    }
});

function addDelay(a,cb){
    setTimeout(()=>{
         cb(null,a/2);
    },5000);
}

function addDelay(a) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a % 2 == 1) {
        reject(`Decimal not allowed ${a / 2}`);
      } else {
        resolve(a / 2);
      }
    }, 5000);
  });
}
*/
