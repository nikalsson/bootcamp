// var circle = new Path.Circle({
// 	center: [0, 0],
// 	radius: 10,
// 	fillColor: 'red'
// });

// // Make horizontal copies of the original circle
// for (var i = 0; i < 20; i++) {
// 	var copyX = circle.clone();

// 	// Distribute the copies horizontally, so we can see them:
// 	copyX.position += new Point(100, 0) * i;
// 	copyX.strokeColor = "blue"
// 	copyX.strokeWidth = 3;
// 	// Make vertical copies of horizontal copies
// 		for (var x = 0 ; x < 20; x++) {
// 			var copyY = copyX.clone();
// 			copyY.position += new Point(0, 100) * x;
// 			copyY.strokeColor = "green"
// 		}
// }


// OTHER METHOD - 

// Array on X-axis
for (var x = 0; x < 2000; x+=100) {
	// Array on Y-axis
	for (var y = 0; y < 2000; y+=100) {
		// A circle to be drawn in the loops
		new Path.Circle({
			center: [x, y],
			radius: 10,
			fillColor: 'red'
		})
	}	
}		