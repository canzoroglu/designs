let startDiv = document.querySelector("#start-div"); //start view
let flagsDiv = document.querySelector("#flags-div"); //flag game view
let gameArea = document.querySelector("#game-area");
let results = document.querySelector("#results");
let nextButton = document.querySelector("#next");
let timer = document.querySelector("#time");
let navItemLink = document.querySelectorAll("li.nav-item a");
let flagsButton = document.querySelector("a[name='flags']");

const countryAbbr = Object.keys(countries);
const countryNames = Object.values(countries);
let flagQuestions = [];

function chooseRandomArrEl(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArr(arr) {
    let j, x, i;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }
    return arr;
}

function createQuestion() {
  while (true) {
    let question = chooseRandomArrEl(countryAbbr);
    if (flagQuestions.indexOf(question) === -1) {
      flagQuestions.push(question);
      return question;
    }
  }
}

function createOptions(optionNumber = 5) {
  let flagOptions = [];
  let question = createQuestion();
  flagOptions.push(countries[question]);
  while (flagOptions.length < optionNumber) {
    let option = chooseRandomArrEl(countryNames);
    if (flagOptions.indexOf(option) === -1) {
      flagOptions.push(option);
    }
  }
  return shuffleArr(flagOptions);
}

// for (let i = 0; i < 5; i++) {
//   let examples = [];
//   let src = "";
//   let options = createOptions();
//   src = flagQuestions[flagQuestions.length - 1].toLowerCase() + ".svg";
//   examples.push({flag: src, options});
//   console.log(examples);
// }

nextButton.addEventListener("click", () => {

  //Next butonuna tıklanınca seçenekler ve bayraklar değişssin
  //radio tipindeki inputları seç, bunların value ve labellarını yeni
  //oluşturulan seçenekler ile değiştir

});

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
