//printreverse()
//write a function that takes an array as an argument returns the elements in reverse order

var array1 = [1,2,3,4,5,6,7,8,9,10];
var array2 = ["a","b","c","d","e","f","g","h","i","j"];

function printReverse(input) {
	var reversed = input.reverse();
	reversed.forEach(function (placeHolder) {
		console.log(placeHolder);
	});
}


var array3 = [1,1,1,2];
var array4 = [1,1,1,1];

//isUniform()
//returns true if all elements are identical

function isUniform(input) {
	var elementToCompare = input[0];
	console.log("Comparing array " + input + " against the first element -- " + elementToCompare);
	for (var i = 1; i < input.length; i++) {
		if (input[i] !== elementToCompare) {
			return false;
		} else {
			return true;
		}
	}
}

//sumArray()
//accepts an array of numbers and sums them

function sumArray(input) {
	var sum = input.reduce(function (accumulator, currentValue) {
  return accumulator + currentValue;
	});
	console.log(sum);
}

function sumArrayAlt(input) {
	var total = 0;
	input.forEach(function (element) {
		console.log(total + element);
		total += element
	}); return total;
}

// use variable for max, update variable if new max is higher

//max()
//find and log the highest element in an array

function max(input) {
	var tempMax = input[0];
	console.log(tempMax);
	input.forEach(function (element) {
		if (element > tempMax) {
			console.log(element + " > " + tempMax);
			tempMax = element;
		}	
	}); console.log(tempMax);
}




// You can pass in an anonymous function:

// [1,2,3].forEach(function(el, i, arr) {
//   console.log(el, i, arr);
// });
// Or you can pass in a pre-written, named function.

// function logNums(el, i, arr) {
//   console.log(el, i, arr);
// }
 
// [1,2,3].forEach(logNums);
