let rubiks;
let a = 0;
function setup() {
	createCanvas(600, 600, WEBGL);
	rubiks = new RubiksCube(0, 0, 0, 150);
}

function draw() {
	background(0);
	rotateX(radians(45));
	rubiks.draw();
	rubiks.update();
}


function keyPressed() {
	if (!rubiks.animating){
		if (keyCode === LEFT_ARROW) {
			rubiks.backClockwise();
		} else if (keyCode === UP_ARROW) {
			rubiks.leftClockwise();
		}
	}

}

