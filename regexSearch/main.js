let searchString = document.querySelector("#search-string");
let result = document.querySelector("#result");
let buttons = document.querySelectorAll("button");
let inputs = document.querySelectorAll("div.regex-string input"); //includes regexs

//Add event listener all buttons and bring the value of the input (regex) of the clicked button
buttons.forEach(button => button.addEventListener("click", evt => {
  let buttonNameAttr = +evt.target.name; //coerce value of name attr to number
  //apply test method
  if(buttonNameAttr === 0){
    result.value = new RegExp(inputs[buttonNameAttr].value).test(searchString.value);
  }
  //apply match method
  else if (buttonNameAttr === 1){
    console.log(new RegExp(inputs[buttonNameAttr].value));
    result.value = searchString.value.match(new RegExp(inputs[buttonNameAttr].value, "g"));
  }
}));
