var gameholder = document.querySelector("#gameholder");
var mounds = document.querySelectorAll("#gameholder > div:nth-of-type(n + 3)");
var buttons = document.querySelector("#buttons");
var num;
var clickedMounds = [];
var gameMode;
var moundClickCount = 0;

controlMoundsClick("disable");

function pickRandomNumber(){
	return Math.floor(Math.random() * 9);
}

buttons.addEventListener("click", function(e){
	for(var i = 0; i < e.path[1].children.length - 1; i++){
		e.path[1].children[i].disabled = true;
	}
}
	);
gameholder.addEventListener("click", function(e){
	if(e.target.textContent === "vsComputer"){
		num = pickRandomNumber();
		console.log(num);
		gameMode = "comp";
		controlMoundsClick("enable");
	}else if(e.target.textContent === "vsHuman"){
		num = pickRandomNumber();
		console.log(num);
		gameMode = "human";
		controlMoundsClick("enable");
	}
	if(e.target.textContent === "Reset"){
		location.reload();
	}
	if(gameMode === "human"){
		humanMode(e);
	}else {
		compMode(e);
	}
	
})

function computerTurn(clickeds, yetiNum){
	var computerChoice = clickeds[0];
	while(clickeds.indexOf(computerChoice) !== -1){
		computerChoice = pickRandomNumber();
	}
	if(computerChoice === yetiNum){
		mounds[computerChoice].style.backgroundImage = "url('penguin_pngs/yeti.png')";
		mounds[computerChoice].style.boxShadow = "1px 1px 25px 5px red";
		controlMoundsClick("disable");
	}else{
		mounds[computerChoice].style.backgroundImage = "url('penguin_pngs/penguin_1.png')";
		mounds[computerChoice].style.boxShadow = "1px 1px 25px 5px red";
		mounds[computerChoice].style.pointerEvents = "none";
	}
	clickedMounds.push(computerChoice);
}

//if the gameMode is computer
function compMode(e){
	var targetIndex = Object.values(mounds).indexOf(e.target);
	clickedMounds.push(targetIndex);
	if(targetIndex !== -1 && targetIndex !== num){
		e.target.style.backgroundImage = "url('penguin_pngs/penguin_1.png')";
		e.target.style.pointerEvents = "none";
		setTimeout(function(){
			computerTurn(clickedMounds, num);
		}, 1000);
	}
	else if(targetIndex === num){
		e.target.style.backgroundImage = "url('penguin_pngs/yeti.png')";
		controlMoundsClick("disable");
	}
}

//if the gameMode is human
function humanMode(e){
	var targetIndex = Object.values(mounds).indexOf(e.target);
	clickedMounds.push(targetIndex);
	moundClickCount++;
	if(moundClickCount % 2 === 0){
		e.target.style.boxShadow = "1px 1px 25px 5px red";
	}
	if(targetIndex !== -1 && targetIndex !== num){
		e.target.style.backgroundImage = "url('penguin_pngs/penguin_1.png')";
		e.target.style.pointerEvents = "none";
	}
	else if(targetIndex === num){
		e.target.style.backgroundImage = "url('penguin_pngs/yeti.png')";
		mounds.forEach(function(el){
			el.style.pointerEvents = "none";
		});
	}
}

//use for control mound divs to disable or eneble clicking
function controlMoundsClick(c){
	if(c === "enable"){
		mounds.forEach(function(el){
			el.style.pointerEvents = "auto";
		});
	}else if(c === "disable"){
		mounds.forEach(function(el){
			el.style.pointerEvents = "none";
		});
	}
}