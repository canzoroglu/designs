let startDiv = document.querySelector("#start-div"); //start view
let flagsDiv = document.querySelector("#flags-div"); //flag game view
let capitalsDiv = document.querySelector("#capitals-div"); //flag game view
let gameArea = document.querySelector("#game-area");
let gameAreaCaps = document.querySelector("#game-area-caps");
let flagImage = document.querySelector("#flag-img");
let correct = document.querySelector("#correct");
let correctCaps = document.querySelector("#correct-caps");
let correctResults = document.querySelector("#correct-results");
let correctResultsCaps = document.querySelector("#correct-results-caps");
let wrongResults = document.querySelector("#wrong-results");
let wrongResultsCaps = document.querySelector("#wrong-results-caps");
let wrong = document.querySelector("#wrong");
let wrongCaps = document.querySelector("#wrong-caps");
let radioButtons = document.querySelectorAll("#game-area input[name='option']");
let radioButtonsCaps = document.querySelectorAll("#game-area-caps input[name='option']");
let results = document.querySelector("#results");
let resultsCaps = document.querySelector("#results-caps");
let nextButton = document.querySelector("#next");
let nextButtonCaps = document.querySelector("#next-caps");
let timer = document.querySelector("#time");
let timerCaps = document.querySelector("#time-caps");
let navItemLink = document.querySelectorAll("li.nav-item a");
let flagsButton = document.querySelector("a[name='flags']");
let capitalsButton = document.querySelector("a[name='capitals']");
let cptlQuestion = document.querySelector("#country-name");
let checked;
let gameMode;
let rightAns = [], wrongAns = [];
let trueScore = wrongScore = 0;

const countryAbbr = Object.keys(countries);
const countryNames = Object.values(countries);
const countryCapital = Object.keys(capitals);
const capitalCities = Object.values(capitals);
let flagQuestions = [];
let capitalsQuestions = [];

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

function createQuestion(source, target) {
  while (true) {
    let question = chooseRandomArrEl(source);
    if (target.indexOf(question) === -1) {
      target.push(question);
      return question;
    }
  }
}

function createOptions(mainObj, source, prevQuestions, optionSource, optionNumber = 5) {
  let options = [];
  let question = createQuestion(source, prevQuestions);
  options.push(mainObj[question]);
  while (options.length < optionNumber) {
    let option = chooseRandomArrEl(optionSource);
    if (options.indexOf(option) === -1) {
      options.push(option);
    }
  }
  return shuffleArr(options);
}

function createFlagGameArea() {
  let options = createOptions(countries, countryAbbr, flagQuestions, countryNames);
  let newFlag = "./countries/svg/" + flagQuestions[flagQuestions.length - 1].toLowerCase() + ".svg";
  gameArea.firstElementChild.src = newFlag;
  radioButtons.forEach((radioButton, index) => {
    radioButton.checked = false;
    radioButton.value = options[index];
    radioButton.nextElementSibling.textContent = options[index];
  });
}

function createCapitalsGameArea() {
  let options = createOptions(capitals, countryCapital, capitalsQuestions, capitalCities);
  cptlQuestion.textContent = capitalsQuestions[capitalsQuestions.length - 1];
  radioButtonsCaps.forEach((radioButton, index) => {
    radioButton.checked = false;
    radioButton.value = options[index];
    radioButton.nextElementSibling.textContent = options[index];
  });
}

function showResults() {

  //Show result for flags game
  if (gameMode === "flags") {
    wrongAns.forEach(answers => {
      let tr = document.createElement("tr");
      let tdImg = document.createElement("td");
      let tdWrongAns = document.createElement("td");
      let tdRightAns = document.createElement("td");
      let img = document.createElement("img");
      img.src = answers.image;
      img.classList.add("result-image");
      tdImg.appendChild(img);
      tr.appendChild(tdImg);
      tdRightAns.textContent = `${answers.actual}`;
      tr.appendChild(tdRightAns);
      tdWrongAns.textContent = `${answers.checked}`;
      tr.appendChild(tdWrongAns);
      wrongResults.tBodies[0].appendChild(tr);
    });
    rightAns.forEach(answer => {
      let tr = document.createElement("tr");
      let tdImg = document.createElement("td");
      let tdRightAns = document.createElement("td");
      let img = document.createElement("img");
      img.src = answer.image;
      img.classList.add("result-image");
      tdImg.appendChild(img);
      tr.appendChild(tdImg);
      tdRightAns.textContent = `${answer.checked}`;
      tr.appendChild(tdRightAns);
      correctResults.tBodies[0].appendChild(tr);
    });
  }
  //Show result for capitals game
  else {
    wrongAns.forEach(answers => {
      let tr = document.createElement("tr");
      let tdCountry = document.createElement("td");
      let tdWrongAns = document.createElement("td");
      let tdRightAns = document.createElement("td");
      tdCountry.textContent = answers.country;
      tr.appendChild(tdCountry);
      tdRightAns.textContent = `${answers.actual}`;
      tr.appendChild(tdRightAns);
      tdWrongAns.textContent = `${answers.checked}`;
      tr.appendChild(tdWrongAns);
      wrongResultsCaps.tBodies[0].appendChild(tr);
    });
    rightAns.forEach(answer => {
      let tr = document.createElement("tr");
      let tdCountry = document.createElement("td");
      let tdRightAns = document.createElement("td");
      tdCountry.textContent = answer.country;
      tr.appendChild(tdCountry);
      tdRightAns.textContent = `${answer.checked}`;
      tr.appendChild(tdRightAns);
      correctResultsCaps.tBodies[0].appendChild(tr);
    });
  }

}

radioButtons.forEach(button => {
  button.addEventListener("click", () => {
      checked = button.value;
  });
});

radioButtonsCaps.forEach(button => {
  button.addEventListener("click", () => {
      checked = button.value;
  });
});

function evalResult() {
  if (gameMode === "flags") {
    let answer = countries[flagQuestions[flagQuestions.length - 1]];
    if (checked == answer) {
      trueScore++;
      rightAns.push({image: flagImage.src, checked});
      correct.textContent = `True: ${trueScore}`;
    } else {
      wrongScore++;
      wrongAns.push({image: flagImage.src, actual: answer, checked});
      wrong.textContent = `False: ${wrongScore}`;
    }
  } else {
    let answer = capitals[capitalsQuestions[capitalsQuestions.length - 1]];
    if (checked == answer) {
      trueScore++;
      rightAns.push({country: cptlQuestion.textContent, checked});
      correctCaps.textContent = `True: ${trueScore}`;
    } else {
      wrongScore++;
      wrongAns.push({country: cptlQuestion.textContent, actual: answer, checked});
      wrongCaps.textContent = `False: ${wrongScore}`;
    }
  }
}

nextButton.addEventListener("click", () => {
  //Evaluate Result
  evalResult();
  //Create New Question
  createFlagGameArea();
});

nextButtonCaps.addEventListener("click", () => {
  //Evaluate Result
  evalResult();
  //Create New Question
  createCapitalsGameArea();
});

flagsButton.addEventListener("click", () => {
  gameMode = "flags";
  createFlagGameArea();
  startDiv.classList.add("d-none");
  flagsDiv.classList.remove("d-none");
  let minute = 0, second = 59;
  let timerID = setInterval(() => {
    if (second < 10) {
      timer.textContent = `${minute}:0${second}`;
    }
    else {
      timer.textContent = `${minute}:${second}`;
    }
    if (second === 0 && minute === 0) {
      showResults();
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
});

capitalsButton.addEventListener("click", () => {
  gameMode = "capitals";
  createCapitalsGameArea();
  startDiv.classList.add("d-none");
  capitalsDiv.classList.remove("d-none");
  let minute = 0, second = 59;
  let timerID = setInterval(() => {
    if (second < 10) {
      timerCaps.textContent = `${minute}:0${second}`;
    }
    else {
      timerCaps.textContent = `${minute}:${second}`;
    }
    if (second === 0 && minute === 0) {
      showResults();
      gameAreaCaps.classList.add("d-none");
      resultsCaps.classList.remove("d-none");
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
