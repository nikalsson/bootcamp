// Target score and form input for new target
var numInput = document.querySelector("input");
var targetScore = document.querySelector("p span");
var maxScore = 5;

numInput.addEventListener("change", function(){
	resetGame();
	targetScore.textContent = this.value;
	maxScore = Number(this.value);
});

//defining variables

var p1Score = 0;
var p1Result = document.querySelector("#p1Result");
var p2Score = 0;
var p2Result = document.querySelector("#p2Result");
var reset = document.getElementById("reset");
var gameOver = false;

//player one button func
var playerOneButton = document.querySelector("#player1");

playerOneButton.addEventListener("click", function(){
	if (!gameOver){
		p1Score++;
		if (p1Score === maxScore) {
			p1Result.classList.add("winner");
			gameOver = true;			
		}
		p1Result.textContent = p1Score;
	}	
});

//player two button func without defining var playerTwoButton

document.getElementById("player2").addEventListener("click", function(){
	if (!gameOver){
		p2Score++;
		if (p2Score === maxScore) {
			p2Result.classList.add("winner");
			gameOver = true;
		}
		p2Result.textContent = p2Score;
	}	
});

//reset button
reset.addEventListener("click", function(){
	resetGame();
});

//function reset when target score change or reset is pressed

function resetGame(){
	p1Score = 0;
	p1Result.textContent = p1Score;
	p1Result.classList.remove("winner");
	p2Score = 0;
	p2Result.textContent = p1Score;
	p2Result.classList.remove("winner");
	gameOver = false;	
}