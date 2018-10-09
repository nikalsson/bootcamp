// between -10 19
console.log("//between -10 19");


var num = -10;

while (num <= 19) {
			 console.log(num); num++;
}

// even numbers 10/40

console.log("//even numbers 10/40");

var num = 10;

while (num <= 40) {
	if (num % 2 === 0) {
		console.log(num);
	}
	num++;
}

// odd numbers 300/333

console.log("// odd numbers 300/333");

var num = 300;

while (num <= 333) {
	if (num % 2 !== 0) {
		console.log(num);
	}
	num++;
}

// divisible with 5 and 3 between 5 and 50

console.log("//divisible with 5 and 3 between 5 and 50");

var num = 5;

while (num <= 50) {
	if (num % 5 === 0 && num % 3 === 0) {
		console.log(num);
	}
	num++;
}