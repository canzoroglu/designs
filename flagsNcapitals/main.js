let startDiv = document.querySelector("#start-div"); //start view
let flagsDiv = document.querySelector("#flags-div"); //flag game view
let gameArea = document.querySelector("#game-area");
let results = document.querySelector("#results");
let timer = document.querySelector("#time");
let navItemLink = document.querySelectorAll("li.nav-item a");
let flagsButton = document.querySelector("a[name='flags']");

flagsButton.addEventListener("click", () => {
  startDiv.classList.add("d-none");
  flagsDiv.classList.remove("d-none");
  let minute = 0, second = 9;
  let timerID = setInterval(() => {
    if (second < 10) {
      timer.textContent = `${minute}:0${second}`;
    }
    else {
      timer.textContent = `${minute}:${second}`;
    }
    if (second === 0 && minute === 0) {
      gameArea.classList.add("d-none");
      results.classList.remove("d-none");
      clearInterval(timerID);
    }
    else if (second === 0) {
      second = 59;
      minute -= 1;
    }
    else {
      second--;
    }
  }, 1000)
})

let collapsedMenu = document.querySelector("nav div.collapse");
navItemLink.forEach(item => {
  item.addEventListener("click", () => collapsedMenu.classList.toggle("show"));
});
