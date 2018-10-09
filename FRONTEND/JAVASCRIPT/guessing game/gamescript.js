let secretNumber = Math.floor(Math.random()*10);
var guess = Number(prompt("Guess the secret number!"));

while (guess !== secretNumber) {
		if (guess < secretNumber) {
		var guess = Number(prompt("Too low, try again!"));
	} else if (guess > secretNumber) {
		var guess = Number(prompt("Too high, try again!"));
	}	
}

alert("You guessed it!");


// if(guess === secretNumber) {
// 	alert("Congratulations, you won the game!");
// } else if (guess < secretNumber) {
// 	var guess = Number(prompt("Too low, try again!"));
// } else if (guess > secretNumber) {
// 	var guess = Number(prompt("Too high, try again!"));
// }