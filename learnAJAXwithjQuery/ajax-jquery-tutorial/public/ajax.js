/*global $*/

// toggle new todo form
$('#new-item-button').on('click', function(e){
    $('#new-todo-form').toggle();
});

// create a new todo, post
$('#new-todo-form').submit(function(event){     // listens to form and submit, when it happens
    event.preventDefault();                     // prevents default action of the form from occurring
    var formData = $(this).serialize();         // get the data from the form with $(this) and turn it into string with serialize()
    $.post('/todos', formData, function(data){  // send a post request to /todos with the formData
        $('#todo-list').append(                 // append will add the new todo to the list, using backticks is new markup
            `
            <li class="list-group-item">
                
            	<!-- EDIT FORM START-->
				<form action="/todos/${data._id}" method="POST" id="edit-todo-form">
					<div class="form-group">
						<label for="${data._id}">Item Text</label>
						<input type="text" value="${data.text}" name="todo[text]" class="form-control" id="${data._id}">
					</div>
					<button class="btn btn-primary">Update Item</button>
				</form>
				<!-- EDIT FORM END -->
        
				<span class="lead">
					${data.text}            
				</span>
				<div class="pull-right">
					<button class="btn btn-sm btn-warning edit-button">Edit</button>
					<form style="display: inline" method="POST" action="/todos/${data._id}" class="delete-todo-form">
						<button type="submit" class="btn btn-sm btn-danger">Delete</button>
					</form>
				</div>
				<div class="clearfix"></div>
			</li>
            ` // have to change from EJS syntax, from <%= todo.text %> to ${data.text} and the id as well
            );
        $('#new-todo-form').find('.form-control').val('');            // empty the new item form after adding a todo    
    });    
});

// toggle the visibility of edit todo
$('#todo-list').on('click', '.edit-button', function() { // cannot add click listener straight to .edit-button because then the newly created ones will not have that click listener - need to add it to parent element
    $(this).parent().siblings('#edit-todo-form').toggle();
});

// set up a listener to edit item form, dynamical listener - listener is in the parent element
$('#todo-list').on('submit', '#edit-todo-form', function(event){
    event.preventDefault();
     var formData = $(this).serialize();                    // get the data from the form with $(this) and turn it into string with serialize()
     var formAction = $(this).attr('action');               // this will return the todo + its ID
     $originalItem = $(this).parent('.list-group-item');    // this can be passed to ajax request, could not pass $this
     $.ajax({
         url: formAction,
         data: formData,
         type: 'PUT',
         originalItem: $originalItem,
         success: function(data){
            this.originalItem.html(                        // pass the replaced list item here, instead of EJS syntax with template literal syntax 
                `
            	<!-- EDIT FORM START-->
				<form action="/todos/${data._id}" method="POST" id="edit-todo-form">
					<div class="form-group">
						<label for="${data._id}">Item Text</label>
						<input type="text" value="${data.text}" name="todo[text]" class="form-control" id="${data._id}">
					</div>
					<button class="btn btn-primary">Update Item</button>
				</form>
				<!-- EDIT FORM END -->
		
				<span class="lead">
					${data.text}
				</span>
				<div class="pull-right">
					<button class="btn btn-sm btn-warning edit-button">Edit</button>
					<form style="display: inline" method="POST" action="/todos/${data._id}" class="delete-todo-form">
						<button type="submit" class="btn btn-sm btn-danger">Delete</button>
					</form>
				</div>
				<div class="clearfix"></div>
                `
            );
         }
     });
});

// // delete an existing todo
$('#todo-list').on('submit', '.delete-todo-form', function(e){
    event.preventDefault();
    var confirmDelete = confirm('Are you sure?');
    if(confirmDelete){
        var formAction = $(this).attr('action');
        $itemToDelete = $(this).closest('.list-group-item');
        $.ajax({
            url: formAction,
            type: 'DELETE',
            itemToDelete: $itemToDelete,
            success: function(data){
                this.itemToDelete.remove() // when the item has been removed from DB, remove from DOM
            }
        })
    } else {
        $(this).find('button').blur() // find a button in the form 'this' and blur it if cancel
    }
})