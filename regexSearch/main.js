let searchString = document.querySelector("#search-string");
let result = document.querySelector("#result");
let buttons = document.querySelectorAll("button");
let inputs = document.querySelectorAll("div.regex-string input");

//Add event listener all buttons and bring the value of the input (regex) of the clicked button
buttons.forEach(button => button.addEventListener("click", evt => console.log(inputs.item(+evt.target.name).value)));
