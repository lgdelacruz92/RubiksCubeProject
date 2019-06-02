let cubie;
let a = 0;
function setup() {
	createCanvas(600, 600, WEBGL);
	cubie = new Cubie(100, 100, 100, 50);
}

function draw() {
	background(0);
	cubie.draw();
	cubie.rotateAroundOrigin([
		[cos(a), -sin(a), 0],
		[sin(a), cos(a), 0],
		[0, 0, 1]
	]);
	a += 0.01;
}