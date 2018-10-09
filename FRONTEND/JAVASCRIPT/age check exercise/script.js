
var age = Number(prompt("How old are you?"));

if(age < 0) {
	console.log("AGE ERROR!")
}

else if(age < 18) {
	console.log("You cannot enter.");
}

else if(age < 21) {
	console.log("You can enter but you cannot drink.");
}

else if(age == 21) {
	console.log("Happy 21st birthday!");
}

else {
	console.log("You can enter and drink.");
}

function isEven(age) {
	if (age % 2 !== 0) {
		return "Your age is odd!";
	} else {
		return false;
	}
}

console.log(isEven(age));


function perfectSquare(age) {
	if (age % Math.sqrt(age) === 0) {
  	console.log("Perfect square!");
	}
}

console.log(perfectSquare(age));