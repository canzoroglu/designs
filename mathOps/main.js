let number = document.querySelector("#number");
let base1 = document.querySelector("#base1");
let base2 = document.querySelector("#base2");
let result = document.querySelector("#result");
let button = document.querySelector("button");
function baseConvert(num, base1, base2){
  let numArr = num.split("");
  let numBase2 = [];
  let numBaseTen = numArr.map((item, index, arr) => {
    let len = arr.length - 1;
    return item * Math.pow(base1, len - index);
  }).reduce((acc, item) => acc + item);
  let i = 0;
  while (numBaseTen >= Math.pow(base2, i)){
    i++;
  }
  for(let j = i - 1; j > 0; j--){
     numBase2.push(numBaseTen % base2);
     numBaseTen = Math.floor(numBaseTen / base2);
  }
  numBase2.push(Math.floor(numBaseTen));
  return numBase2.reverse().join("");
}
button.addEventListener("click", () => {
  let res = baseConvert(number.value, +base1.value, +base2.value);
  result.value = res;
});
