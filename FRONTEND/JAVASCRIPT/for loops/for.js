// for (var i = 0; i < 9; i++) {
//   str = str + i;
// }

// console.log(str);
// expected output: "012345678"

// between -10 19

console.log("//PRINT -10:19")
for (var i = -10; i < 20; i++) {
	console.log(i);
}

// even numbers 10/40

console.log("//PRINT EVEN NUMBERS 10:40")
for (var i = 10; i < 41; i+=2) {
	console.log(i);
}

// odd numbers 300/333

console.log("//PRINT ODD NUMBERS 300:333")
for(var i = 300; i <= 333; i++) {
	if(i % 2 !== 0) {
		console.log(i);
	}
}

// divisible with 5 and 3 between 5 and 50

console.log("//DIVISIBLE WITH 5 AND 3 BETWEEN 5 & 50")
for(var i = 5; i <= 50; i++) {
	if(i % 3 === 0 && i % 5 === 0 ) {
		console.log(i);
	}
}

//make for loop that picks numbers divisible with 3

console.log("//FOR ARRAY DIVISIBLE BY 3")
var numbers = [1,2,3,4,5,6,7,8,9,10,11,12];
for(var i = numbers[0]; i <= numbers.length; i++) {
	if(i % 3 === 0) {
		console.log(i);
	}
}	

// Age difference
// When my father was 31 years old, I was 8 years old, but now my father is two times older than me. How old am I now?


var fatherAtBorn = 31-8;
console.log(fatherAtBorn);
for (var myAge = 0;  myAge <=  0.5 * fatherAtBorn; myAge++, fatherAtBorn++) {
	console.log(`My age is ${myAge}`);
	console.log(`My father's age is ${fatherAtBorn}`);
	console.log(`The ratio of our age is ${fatherAtBorn / myAge}`);
}