var numberOfSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var headingTargetRGB = document.querySelector("#headingTargetRGB");
var instruction = document.getElementById("instruction");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#resetButton");
var modeButtons = document.querySelectorAll(".mode");


//functionality for reset button
resetButton.addEventListener("click", function(){
	reset();
});

//starts the game, sets up mode selectors and the game board
init();

function init(){
	setupModeButtons();
	setupSquares();
	reset();
}	

function setupModeButtons() {
	// Instead of two separate event listeners for buttons, this is wrapped in one
	for (var i = 0; i < modeButtons.length; i++){
		// mode buttons event listeners
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			// Can increase number of squares here
			if (this.textContent === "EASY"){
				numberOfSquares = 3;
			} else {
				numberOfSquares = 6;
			}
			// Alt way for the if statement below, shorter
			// this.textContent === "EASY" ? numberOfSquares = 3: numberOfSquares = 6;
			reset();
		})
	}
}

function setupSquares(){
	for (var i = 0; i < squares.length; i++) {
	//  Registers when a square is clicked
	squares[i].addEventListener("click", function(){		
		// Compare if the clicked square's color matches pickedColor
		if (this.style.backgroundColor === pickedColor) {
			// Change h1 and all squared to winning color
			instruction.textContent = "YOU WON!";
			resetButton.textContent = "PLAY AGAIN?";
			h1.style.backgroundColor = pickedColor;
			changeAllSquares(pickedColor);
		} else {
			// Fade out the wrong option
			this.style.backgroundColor = "#232323";
			instruction.textContent = "Try again!";
		}
	});
	}
}


// The reset function used by modeselector and reset button
function reset(){
	resetButton.textContent = "NEW COLORS";
	instruction.textContent = "";
	colors = generateRandomColor(numberOfSquares);
	pickedColor = pickColor();
	//  Update the target RGB to the heading
	headingTargetRGB.textContent = pickedColor;
	for (var i = 0; i < squares.length; i++) {
	 	if (colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}	
	h1.style.backgroundColor = "steelblue";
}

//  Change the colors of all squares when the game is won
function changeAllSquares(color){
	for (var i = 0; i < squares.length; i++) {
	squares[i].style.backgroundColor = color;
	}
}

//  Pick a random color
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

// Generates random rgb colors for the game
function generateRandomColor(num){
	//make an array
	var arr = [];
	//repeat num times
	for (var i = 0; i < num; i++){
		// Get a random color fron function and push it to the array
		arr.push(randomColor());
	}
	//return the array
	return arr;
}

// PICK R, B and G between 0 - 255
function randomColor(){
	var R = Math.floor(Math.random() * 256);
	var G = Math.floor(Math.random() * 256);
	var B = Math.floor(Math.random() * 256);
	return "rgb(" + R + ", " + G + ", " + B + ")";
}



//  EASY AND HARD BUTTONS SEPARATELY

//  Chande game to have 3 squares and reset, hides last 3 squares
// easyMode.addEventListener("click", function(){
// 	easyMode.classList.add("selected");
// 	hardMode.classList.remove("selected");
// 	h1.style.backgroundColor = "steelblue";
// 	numberOfSquares = 3;
// 	colors = generateRandomColor(numberOfSquares);
// 	pickedColor = pickColor();
// 	headingTargetRGB.textContent = pickedColor;
// 	for (var i = 0; i < squares.length; i++){
// 		if (colors[i]){
// 			squares[i].style.backgroundColor = colors[i];
// 		} else {
// 			squares[i].style.display = "none";
// 		}
// 	}
// })

//  Chande game to have 6 squares and reset
// hardMode.addEventListener("click", function(){
// 	hardMode.classList.add("selected");
// 	easyMode.classList.remove("selected");
// 	h1.style.backgroundColor = "steelblue";
// 	numberOfSquares = 6;
// 	colors = generateRandomColor(numberOfSquares);
// 	pickedColor = pickColor();
// 	headingTargetRGB.textContent = pickedColor;
// 	for (var i = 0; i < squares.length; i++){
// 		squares[i].style.backgroundColor = colors[i];
// 		squares[i].style.display = "block";
// 	}
// })

