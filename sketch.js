let rubiks;
let a = 0;
function setup() {
	createCanvas(600, 600, WEBGL);
	rubiks = new RubiksCube(0, 0, 0, 150);
}

function draw() {
	background(0);
	rotateX(radians(-45));
	rotateY(radians(45));
	rubiks.draw();
	rubiks.update();
}

function keyTyped() {
	if (!rubiks.animating) {
		if (key === 's') {
			rubiks.backCounterClockwise();
		} else if (key === 'd') {
			rubiks.backClockwise();
		}

		else if (key === 'q') {
			rubiks.leftCounterClockwise();
		}
		else if (key === 'a') {
			rubiks.leftClockwise();
		}

		else if (key === 'v') {
			rubiks.frontClockwise();
		}
		else if (key === 'z') {
			rubiks.frontCounterClockwise();
		}

		else if (key === 'w') {
			rubiks.upClockwise();
		}
		else if (key === 'e') {
			rubiks.upCounterClockwise();
		}

		else if (key === 'x') {
			rubiks.downCounterClockwise();
		}
		else if (key === 'c') {
			rubiks.downClockwise();
		}

		else if (key === 'r') {
			rubiks.rightClockwise();
		}
		else if (key === 'f') {
			rubiks.rightCounterClockwise();
		}
	}
}

