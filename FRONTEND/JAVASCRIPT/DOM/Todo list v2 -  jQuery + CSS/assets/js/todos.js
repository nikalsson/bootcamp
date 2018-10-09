// Check off specific todos by clicking

$("ul").on("click", "li", function(){
	$(this).toggleClass("doneToDo");
})

// Delete and fade out by clicking on class .delete, stopPropagation prevents the click from firing other listeners

$("ul").on("click", ".delete", function(event){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	})
	event.stopPropagation();
})

// Add new todos to the ul

$("input[type='text']").on("keypress", function(event){
	 if (event.which === 13) {
		// Saving new todo from input field 
		var newToDo = $(this).val();
		// Create new li and add to ul
		$("ul").append("<li><span class='delete'><i class='fas fa-trash'></i></span>" + newToDo + "</li>");
		// Clear the text input 
		$(this).val(""); 
	 }
})


$("#plus").on("click", function(){
	$("input[type='text']").fadeToggle();
})


// Long and complicated method for crossing of todos
// 	$("li").on("click", function(){
// 		if ($(this).css("color") === "rgb(166, 166, 166)") {
// 			$(this).css({
// 				color: "#000000",
// 				textDecoration: "none",
// 			}) 	
// 		} else {
// 			$(this).css({
// 				color: "#a6a6a6",
// 				textDecoration: "line-through",
// 			}) 	
// 		}
// 	})		