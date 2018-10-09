//toggle the background color with the button

// var body = document.querySelector("body");
var myButton = document.querySelector("#specialButton");
var isPink = false;


//1st method

// myButton.addEventListener('click', function(){
// 	document.body.classList.toggle("pinkBG");
//  }
// );


//2nd method

// myButton.addEventListener('click', function(){
// 	if(body.style.backgroundColor !== "pink"){
// 		body.style.backgroundColor = "pink";
// 	} else {
// 		body.style.backgroundColor = "white";
// 	}
// });


//3rd method

myButton.addEventListener('click', function(){
 if(isPink){
	 document.body.style.background = "white";
 } else {
	 document.body.style.background = "pink";
 } isPink = !isPink;
});

//PLAYING WITH THE LIST ITEMS, TURN GREY WHEN HOVERED OVER
var allLis = document.querySelectorAll("li");

for (var i = 0; i < allLis.length; i++) {
	allLis[i].addEventListener("mouseover", function(){
		this.classList.add("hoverListItem");
	})

	allLis[i].addEventListener("mouseout", function(){
		this.classList.remove("hoverListItem");
	})
	
	allLis[i].addEventListener("click", function(){
		this.classList.toggle("text-strike");
	})
}

