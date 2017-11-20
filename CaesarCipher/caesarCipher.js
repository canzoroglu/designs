var input = document.querySelector("#text");
var buttons = document.querySelector("#buttons");
var convert = document.querySelector("#convert");
var result = document.querySelector("#result");
var key = document.querySelector("#key");
var letters = ["A", "B", "C", "Ç", "D", "E", "F", "G", "Ğ", "H", "I", "İ", "J", "K", "L", "M", "N", "O", "Ö", "P", "R", "S", "Ş", "T", "U", "Ü", "V", "Y", "Z", "X", "Q", "W"]

function caesarCipher(str, key){
	str = str.toUpperCase();
	str = str.replace(/(\w|\u00c7|\u011e|\u015e|\u00d6|\u00dc|\u0130)/g, function(match, p1){
		var letterNum = letters.indexOf(p1) + key;
		if(letterNum <= 31 && letterNum >= 0){
			return letters[letterNum];
		}else if(letterNum > 31){
			return letters[letterNum - 32];
		}else {
			return letters[32 + letterNum];
		}
	});
	return str;
}

buttons.addEventListener("click", function(e){
	var num = Number(key.value);
	if(e.target.textContent == "Right"){
		num = -1 * num;
		key.value = num;
		//return key;
	}else if(e.target.textContent == "Clear"){
		result.textContent = "";
		key.value = "";
		input.value = "";
	}else if(e.target.textContent == "Exchange"){
		input.value = result.textContent;
		result.textContent = "";
		key.value = "";
	}
	
});

convert.addEventListener("click", function(){
	var num = Number(key.value);
	result.textContent = caesarCipher(input.value, num);
})
//Add decrypter which finds the key.