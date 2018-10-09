//In Bruges - Mad Max - Aladdin
var films = [
	{
		title: "In Bruges",
		haveSeen: true,
		stars: 4,
	},
	{
		title: "Mad Max",
		haveSeen: true,
		stars: 5,	
	},
	{
		title: "Aladdin",
		haveSeen: true,
		stars: 3.5,
	},
	{
		title: "Star Wars",
		haveSeen: false,
		stars: 4,
	}
];

//function with forEach

function makeList() {
	films.forEach(function (movie) {
		var result = "I have ";
		if (movie.haveSeen === true) {
			result += "watched ";
		} else {
			result += "not seen ";
		}
		result += "\"" + movie.title + "\"" + " - " + movie.stars + " stars.";
		console.log(result)
	});
}

//alternative version with for loop

function altList() {
	for (var i = 0; i < films.length; i++){
		if (films[i].haveSeen === true){
      console.log("You have watched " + films[i].title + " - " + films[i].stars + " stars");
    }
    else {
      console.log("You have not seen " + films[i].title + " - " + films[i].stars + " stars");
    }
  }
}