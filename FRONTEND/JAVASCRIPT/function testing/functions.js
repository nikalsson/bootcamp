//isEven, function that checks if number is even

function isEven(num) {
	if (num % 2 === 0) {
		return true;
	} else {
		return false;
	}
}


// factorial(), take a number and return factorial of that number

function factorial(num) {
	if (num < 0) {
		return ">0 NOT ACCEPTED";
	} else if (num === 0) {
		return 1;
	} else {
		return num * factorial(num-1);
	}
}

function factorialAlt(num) {
	var result = 1;
	for (var i = 1; i <= num; i++) {
		result *= i;
	}
	return result;
}

// kebabToSnake turn kebab-case to snake_case -to_

function kebabToSnake(str) {
	var replace = /-/g;
	var newstr = str.replace(replace, "_");
	return newstr;
}
