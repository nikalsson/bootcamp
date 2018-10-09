//function added to an object - METHOD

var testObject = {
	name: "Testi Ukko",
	age: 102,
	isUseful: true,
	skills: ["testing", "learning"],
	add: function(x,y){
		return x + y;	
	}
}

//to avoid namespace collision, same function in both objects
var dog = {
	speak: function(){
		return "WOOF!";
	}
}

var cat = {
	speak: function(){
		return "MEOW!";
	}
}

//method this example, access the .data with a method

var comments = {};
comments.data = ["TEST", "ANOTHER TEST", "NUMBER 3"];
comments.print = function(){
	this.data.forEach(function (el){
		console.log(el);
	})
}