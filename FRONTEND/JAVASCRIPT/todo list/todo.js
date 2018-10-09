window.setTimeout(function() {
	
	var todo = ["test", "abbadabba"];
	var input = prompt("What would you like to do?");
	
	while (input !== "quit") {
			//list items in the list
			if (input === "list") {
				listTodos();
			}
			//add a new item to the list 
			else if (input === "new") {
				newTodo();
			}
			//delete an item from the list
			else if (input === "del") {
				deleteTodo();
			} 
			//otherwise alert for proper inputs
			else alert("Please give input command new, list, del or quit.");
		
		input = prompt("What would you like to do?");
	}
	console.log("YOU QUIT THE APP");

	function listTodos() {
		console.log("*********");
		todo.forEach(function(todo, i) {
			console.log(i + ": " + todo);
		}); console.log("*********");
	}

	function newTodo() {
		var newItem = prompt("What would you like to add?");
		todo.push(newItem);
		console.log(newItem + " added to the list.");
	}

	function deleteTodo() {
		//ask for an index number
		var delItem = Number(prompt("Please input the index of the todo you want to delete."));
		//message 
		console.log(todo[delItem] + " was deleted.");
		//delete the item from todo array
		todo.splice(delItem, 1);
	}

}, 500);

// You can pass in an anonymous function:

// [1,2,3].forEach(function(el, i, arr) {
//   console.log(el, i, arr);
// });
// Or you can pass in a pre-written, named function.

// function logNums(el, i, arr) {
//   console.log(el, i, arr);
// }
 
// [1,2,3].forEach(logNums);