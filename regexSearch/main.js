let searchString = document.querySelector("#search-string");
let result = document.querySelector("#result");
let buttons = document.querySelectorAll("button");
let inputs = document.querySelectorAll("div.regex-string .regexes"); //includes regexs
let checkboxes = document.querySelectorAll("input[type='checkbox']");
let replaceText = document.querySelector("#replace-text");

//Add event listener all buttons and bring the value of the input (regex) of the clicked button
buttons.forEach(button => button.addEventListener("click", evt => {
  let buttonNameAttr = +evt.target.name; //coerce value of name attr to number
  let flags = [];
  checkboxes.forEach(checkbox => {
    if(checkbox.checked){
      flags.push(checkbox.id);
    }
  });
  flags = flags.toString();
  //apply test method
  if(buttonNameAttr === 0){
    result.value = new RegExp(inputs[buttonNameAttr].value, flags).test(searchString.value);
  }
  //apply match method
  else if (buttonNameAttr === 1){
    result.value = searchString.value.match(new RegExp(inputs[buttonNameAttr].value, flags));
  }
  //apply replace Method
  else if (buttonNameAttr === 2) {
    result.value = searchString.value.replace(new RegExp(inputs[buttonNameAttr].value, flags), replaceText.value);
  }
}));
