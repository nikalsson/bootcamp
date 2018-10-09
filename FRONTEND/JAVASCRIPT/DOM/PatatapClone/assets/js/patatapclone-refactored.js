// Display a welcome and instruction message for 5 seconds and fade it out 1 second
function instructions() {
	setTimeout(function(){
		document.querySelector('h1').classList.add('visuallyHidden');
		}, 5000);
	// Remove the instruction element after it has faded out
	setTimeout(function(){
		document.querySelector('h1').remove();
	}, 6000)
}

// Displays the welcome message when the window has loaded
window.onload = instructions();

function onKeyDown(event) {
	// Check the key pressed
	if(keyData[event.key]){
		// Play the sound associated with the circle
		keyData[event.key].sound.play();
		// Drawing on the randomly generated points, adding to the array of circles
		new Path.Circle({
			center: newRandomPoint(),
			radius: 300,
			// Fill the circle with a randomly created RGB color
			fillColor: randomRGB(),
			onFrame: function fadeCircle(){
				this.scale(0.9);
				this.fillColor.hue +=2;
				if(this.area < 1) {
					this.remove()
				}
			}
		})
	}	
}

// Return a random point within the canvas
function newRandomPoint(){
		// Find the max width and height values
		var maxPoint = new Point(view.size.width, view.size.height);
		var randomPoint = new Point.random();
		// Defining a point on the visible canvas area
		return maxPoint * randomPoint;
}

// Return a randomly created RGB color Color(red, green, blue[, alpha])
function randomRGB() {
	var RGB = new Color(Math.random(), Math.random(), Math.random());
	return RGB;
}

// Below object houses the different sounds and colors for every key
var keyData = {
	q: {
		sound: new Howl({
			src: ['sounds/bubbles.mp3']
		}),
	},
	w: {
		sound: new Howl({
			src: ['sounds/clay.mp3']
		}),	},
	e: {
	sound: new Howl({
		src: ['sounds/confetti.mp3']
	}),	},
	r: {
	sound: new Howl({
		src: ['sounds/corona.mp3']
	}),	},
	t: {
	sound: new Howl({
		src: ['sounds/dotted-spiral.mp3']
	}),
	},
	y: {
	sound: new Howl({
		src: ['sounds/flash-1.mp3']
	}),
	},
	u: {
	sound: new Howl({
		src: ['sounds/flash-2.mp3']
	}),
	},
	i: {
	sound: new Howl({
		src: ['sounds/flash-3.mp3']
	}),
	},
	o: {
	sound: new Howl({
	src: ['sounds/glimmer.mp3']
	}),
	},
	p: {
	sound: new Howl({
		src: ['sounds/moon.mp3']
	}),
	},
	a: {
	sound: new Howl({
		src: ['sounds/pinwheel.mp3']
	}),
	},
	s: {
	sound: new Howl({
		src: ['sounds/piston-1.mp3']
	}),
	},
	d: {
	sound: new Howl({
		src: ['sounds/piston-2.mp3']
	}),
	},
	f: {
	sound: new Howl({
		src: ['sounds/prism-1.mp3']
	}),
	},
	g: {
	sound: new Howl({
		src: ['sounds/prism-2.mp3']
	}),
	},
	h: {
	sound: new Howl({
		src: ['sounds/prism-3.mp3']
	}),
	},
	j: {
	sound: new Howl({
		src: ['sounds/splits.mp3']
	}),
	},
	k: {
	sound: new Howl({
		src: ['sounds/squiggle.mp3']
	}),
	},
	l: {
	sound: new Howl({
		src: ['sounds/strike.mp3']
	}),
	},
	z: {
	sound: new Howl({
		src: ['sounds/suspension.mp3']
	}),
	},
	x: {
	sound: new Howl({
		src: ['sounds/timer.mp3']
	}),
	},
	c: {
	sound: new Howl({
		src: ['sounds/ufo.mp3']
	}),
	},
	v: {
	sound: new Howl({
		src: ['sounds/veil.mp3']
	}),
	},
	b: {
	sound: new Howl({
		src: ['sounds/wipe.mp3']
	}),
	},
	n: {
	sound: new Howl({
	src: ['sounds/zig-zag.mp3']
	}),
	},
	m: {
	sound: new Howl({
		src: ['sounds/moon.mp3']
	}),
	}
}