var answer = prompt("Are we there yet?");

while (answer.indexOf("yes") === -1) {
	var answer = prompt("Are we there yet?");
}

alert("We made it!");

// var str1 = "ABCDEFGHIJKLMNOP";
// var str2 = "DEFG";
// if(str1.indexOf(str2) != -1){
//     console.log(str2 + " found");
// }