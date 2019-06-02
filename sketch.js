let rubiks;
function setup() {
	createCanvas(600, 600, WEBGL);
	rubiks = new RubiksCube(0, 0, 0, 150);
}

function draw() {
	background(0);
	rotateX(radians(45));
	rotateY(radians(45));
	// rotateX(frameCount * 0.01);
	// rotateY(frameCount * 0.01);
	rubiks.draw();
}


function keyPressed() {
  if (keyCode === LEFT_ARROW) {
	}
}