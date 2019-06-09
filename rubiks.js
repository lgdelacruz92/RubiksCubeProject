const Colors = {
	red: {
		r: 255,
		g: 0,
		b: 0
	},
	green: {
		r: 0,
		g: 255,
		b: 0
	},
	blue: {
		r: 0,
		g: 0,
		b: 255
	},
	yellow: {
		r: 255,
		g: 255,
		b: 0
	},
	white: {
		r: 255,
		g: 255,
		b: 255
	},
	orange: {
		r: 255,
		g: 165,
		b: 0
	}
};

function mult(mat, point) {
	let result = [];
	for (let y = 0; y < 3; y++) {
		let r = 0;
		for (let x = 0; x < 3; x++) {
			r += mat[y][x] * point[x];
		}
		result.push(r);
	}
	return result;
}

function multVec(mat, vec) {
	let result = mult(mat, [vec.x, vec.y, vec.z]);
	return createVector(result[0], result[1], result[2]);
}

function convertToMultArray(indices) {
	let result = [];
	for (let i = 0; i < 3; i++) {
		let r = [];
		for (let j = 0; j < 3; j++) {
			let index = i * 3 + j;
			r.push(indices[index]);
		}
		result.push(r);
	}
	return result;
}


function copyInstance (original) {
  var copied = Object.assign(
    Object.create(
      Object.getPrototypeOf(original)
    ),
    original
  );
  return copied;
}

function swapItems(a, b, cubies) {
	let temp = copyInstance(cubies[a]);
	cubies[a] = cubies[b];
	cubies[b] = temp;
}

function index(x, y, w) {
	return y * (w + 1) + x;
}

function rotateClockwise(indices, cubies) {
	let w = 2;
	for (let x = 0; x < w; x++) {
		swapItems(indices[index(x, 0, w)], indices[index(w, x, w)], cubies);
		swapItems(indices[index(x, 0, w)], indices[index(w - x, w, w)], cubies);
		swapItems(indices[index(x, 0, w)], indices[index(0, w - x, w)], cubies);
	}
}

function rotateCounterClockwise(indices, cubies) {
	let w = 2;
	for (let x = 0; x < w; x++) {
		swapItems(indices[index(0, x, w)], indices[index(x, w, w)], cubies);
		swapItems(indices[index(0, x, w)], indices[index(w, w - x, w)], cubies);
		swapItems(indices[index(0, x, w)], indices[index(w - x, 0, w)], cubies);
	}
}


class Cubie {
	constructor(x, y, z, w) {
		this.s = w/2;
		this.pos = createVector(x, y, z);
		this.topLeftFrontI = createVector(-this.s, -this.s, this.s);
		this.topRightFrontI = createVector(this.s, -this.s, this.s);
		this.bottomLeftFrontI = createVector(-this.s, this.s, this.s);
		this.bottomRightFrontI = createVector(this.s, this.s, this.s);
		this.topLeftBackI = createVector(-this.s, -this.s, -this.s);
		this.topRightBackI = createVector(this.s, -this.s, -this.s);
		this.bottomLeftBackI = createVector(-this.s, this.s, -this.s);
		this.bottomRightBackI = createVector(this.s, this.s, -this.s);

		this.topLeftFront = p5.Vector.add(this.pos, this.topLeftFrontI);
		this.topRightFront = p5.Vector.add(this.pos, this.topRightFrontI);
		this.bottomLeftFront = p5.Vector.add(this.pos, this.bottomLeftFrontI);
		this.bottomRightFront = p5.Vector.add(this.pos, this.bottomRightFrontI);
		this.topLeftBack = p5.Vector.add(this.pos, this.topLeftBackI);
		this.topRightBack = p5.Vector.add(this.pos, this.topRightBackI);
		this.bottomLeftBack = p5.Vector.add(this.pos, this.bottomLeftBackI);
		this.bottomRightBack = p5.Vector.add(this.pos, this.bottomRightBackI);

		this.topLeftFrontO = p5.Vector.add(this.pos, this.topLeftFrontI);
		this.topRightFrontO = p5.Vector.add(this.pos, this.topRightFrontI);
		this.bottomLeftFrontO = p5.Vector.add(this.pos, this.bottomLeftFrontI);
		this.bottomRightFrontO = p5.Vector.add(this.pos, this.bottomRightFrontI);
		this.topLeftBackO = p5.Vector.add(this.pos, this.topLeftBackI);
		this.topRightBackO = p5.Vector.add(this.pos, this.topRightBackI);
		this.bottomLeftBackO = p5.Vector.add(this.pos, this.bottomLeftBackI);
		this.bottomRightBackO = p5.Vector.add(this.pos, this.bottomRightBackI);

	}

	rotateAroundOrigin(mat) {
		this.topLeftFront = multVec(mat, this.topLeftFrontO);
		this.topRightFront = multVec(mat, this.topRightFrontO);
		this.bottomLeftFront = multVec(mat, this.bottomLeftFrontO);
		this.bottomRightFront = multVec(mat, this.bottomRightFrontO);
		this.topLeftBack = multVec(mat, this.topLeftBackO);
		this.topRightBack = multVec(mat, this.topRightBackO);
		this.bottomLeftBack = multVec(mat, this.bottomLeftBackO);
		this.bottomRightBack = multVec(mat, this.bottomRightBackO);
	}

	updateCoordinates() {
		this.topLeftFrontO = this.topLeftFront;
		this.topRightFrontO = this.topRightFront;
		this.bottomLeftFrontO = this.bottomLeftFront;
		this.bottomRightFrontO = this.bottomRightFront;
		this.topLeftBackO = this.topLeftBack;
		this.topRightBackO = this.topRightBack;
		this.bottomLeftBackO = this.bottomLeftBack;
		this.bottomRightBackO = this.bottomRightBack;
	}

	update() {
		this.topLeftFront = p5.Vector.add(this.pos, this.topLeftFrontI);
		this.topRightFront = p5.Vector.add(this.pos, this.topRightFrontI);
		this.bottomLeftFront = p5.Vector.add(this.pos, this.bottomLeftFrontI);
		this.bottomRightFront = p5.Vector.add(this.pos, this.bottomRightFrontI);
		this.topLeftBack = p5.Vector.add(this.pos, this.topLeftBackI);
		this.topRightBack = p5.Vector.add(this.pos, this.topRightBackI);
		this.bottomLeftBack = p5.Vector.add(this.pos, this.bottomLeftBackI);
		this.bottomRightBack = p5.Vector.add(this.pos, this.bottomRightBackI);
	}

	draw() {

		push();
		beginShape(TRIANGLE_STRIP);
		// front
		fill(Colors.white.r, Colors.white.g, Colors.white.b);
		stroke(Colors.white.r, Colors.white.g, Colors.white.b);
		vertex(this.topLeftFront.x, this.topLeftFront.y, this.topLeftFront.z);
		vertex(this.topRightFront.x, this.topRightFront.y, this.topRightFront.z);
		vertex(this.bottomLeftFront.x, this.bottomLeftFront.y, this.bottomLeftFront.z);
		vertex(this.bottomRightFront.x, this.bottomRightFront.y, this.bottomRightFront.z);
		endShape();

		// right
		beginShape(TRIANGLE_STRIP);
		fill(Colors.red.r, Colors.red.g, Colors.red.b);
		stroke(Colors.red.r, Colors.red.g, Colors.red.b);
		vertex(this.topRightFront.x, this.topRightFront.y, this.topRightFront.z);
		vertex(this.topRightBack.x, this.topRightBack.y, this.topRightBack.z);
		vertex(this.bottomRightFront.x, this.bottomRightFront.y, this.bottomRightFront.z);
		vertex(this.bottomRightBack.x, this.bottomRightBack.y, this.bottomRightBack.z);
		endShape();

		// top
		beginShape(TRIANGLE_STRIP);
		fill(Colors.green.r, Colors.green.g, Colors.green.b);
		stroke(Colors.green.r, Colors.green.g, Colors.green.b);
		vertex(this.topLeftFront.x, this.topLeftFront.y, this.topLeftFront.z);
		vertex(this.topRightFront.x, this.topRightFront.y, this.topRightFront.z);
		vertex(this.topLeftBack.x, this.topLeftBack.y, this.topLeftBack.z);
		vertex(this.topRightBack.x, this.topRightBack.y, this.topRightBack.z);
		endShape();

		// bottom
		beginShape(TRIANGLE_STRIP);
		fill(Colors.blue.r, Colors.blue.g, Colors.blue.b);
		stroke(Colors.blue.r, Colors.blue.g, Colors.blue.b);
		vertex(this.bottomLeftFront.x, this.bottomLeftFront.y, this.bottomLeftFront.z);
		vertex(this.bottomRightFront.x, this.bottomRightFront.y, this.bottomRightFront.z);
		vertex(this.bottomLeftBack.x, this.bottomLeftBack.y, this.bottomLeftBack.z);
		vertex(this.bottomRightBack.x, this.bottomRightBack.y, this.bottomRightBack.z);
		endShape();

		// left
		beginShape(TRIANGLE_STRIP);
		fill(Colors.orange.r, Colors.orange.g, Colors.orange.b);
		stroke(Colors.orange.r, Colors.orange.g, Colors.orange.b);
		vertex(this.topLeftFront.x, this.topLeftFront.y, this.topLeftFront.z);
		vertex(this.topLeftBack.x, this.topLeftBack.y, this.topLeftBack.z);
		vertex(this.bottomLeftFront.x, this.bottomLeftFront.y, this.bottomLeftFront.z);
		vertex(this.bottomLeftBack.x, this.bottomLeftBack.y, this.bottomLeftBack.z);
		endShape();

		// back
		beginShape(TRIANGLE_STRIP);
		fill(Colors.yellow.r, Colors.yellow.g, Colors.yellow.b);
		stroke(Colors.yellow.r, Colors.yellow.g, Colors.yellow.b);
		vertex(this.topLeftBack.x, this.topLeftBack.y, this.topLeftBack.z);
		vertex(this.topRightBack.x, this.topRightBack.y, this.topRightBack.z);
		vertex(this.bottomLeftBack.x, this.bottomLeftBack.y, this.bottomLeftBack.z);
		vertex(this.bottomRightBack.x, this.bottomRightBack.y, this.bottomRightBack.z);
		endShape();
		pop();
	}
}

const Matrix = {
	rotateX: function(a) {
		return [
			[1, 0, 0],
			[0, cos(radians(a)), -sin(radians(a))],               
			[0, sin(radians(a)), cos(radians(a))]
		]
	},
	rotateZ: function(a) {
		return [ 
			[cos(radians(a)), -sin(radians(a)), 0],
			[sin(radians(a)), cos(radians(a)), 0],               
			[0, 0, 1]
		];
	},
	rotateY: function(a) {
		return [
			[cos(radians(a)), 0, sin(radians(a))],
			[0, 1, 0],               
			[-sin(radians(a)), 0, cos(radians(a))]
		]

	}
}

class RubiksFace {
	constructor(indices, cubies, matFunc) {
		this.indices = indices;
		this.angle = 0;
		this.cubies = cubies;
		this.matFunc = matFunc;
		this.angle = 0;
	}

	_update() {
		this.mat = this.matFunc(this.angle);
		for (let i = 0; i < this.indices.length; i++) {
			this.cubies[this.indices[i]].rotateAroundOrigin(this.mat);
		}
	}

	updateClockwise() {
		this.addAngle();
		this._update();
	}

	updateCounterClockwise() {
		this.subtractAngle();
		this._update();
	}

	subtractAngle() {
		this.angle -= 2;
	}

	addAngle() {
		this.angle += 2;
	}

	updateFace(rotation) {
		rotation(this.indices, this.cubies);
		for (let i = 0; i < this.indices.length; i++) {
			this.cubies[this.indices[i]].updateCoordinates();
		}
		this.angle = 0;
	}

	finished() {
		return this.angle % 90 === 0;
	}
}

class RubiksCube {
	constructor(_x, _y, _z,  s) {
		this.cubies = [];
		const cubieWidth = s / 3;
		for (let z = -1; z < 2; z++) {
			for (let y = -1; y < 2; y++) {
				for (let x = -1; x < 2; x++) {
					this.cubies.push(
						new Cubie(
							cubieWidth * x + _x, 
							cubieWidth * y + _y, 
							cubieWidth * z + _z, 
							cubieWidth
						)
					);
				}
			}
		}

		this.frontFace = new RubiksFace(
			[18, 19, 20, 21, 22, 23, 24, 25, 26],
			this.cubies,
			Matrix.rotateZ
		);

		this.backFace = new RubiksFace(
			[0, 1, 2, 3, 4, 5, 6, 7, 8], 
			this.cubies,
			Matrix.rotateZ
		);

		this.leftFace = new RubiksFace(
			[0, 3, 6, 9, 12, 15, 18, 21, 24],
			this.cubies,
			Matrix.rotateX
		);

		this.upFace = new RubiksFace(
			[0, 1, 2, 9, 10, 11, 18, 19, 20],
			this.cubies,
			Matrix.rotateY
		);

		this.downFace = new RubiksFace(
			[6, 7, 8, 15, 16, 17, 24, 25, 26],
			this.cubies,
			Matrix.rotateY
		);

		this.rightFace = new RubiksFace(
			[20, 11, 2, 23, 14, 5, 26, 17, 8],
			this.cubies,
			Matrix.rotateX
		);


		this.animating = false;
		this.rotateFrontClockwise = false;
		this.rotateFrontCounterClockwise = false;
		this.rotateBackClockwise = false;
		this.rotateBackCounterClockwise = false;
		this.rotateLeftClockwise = false;
		this.rotateLeftCounterClockwise = false;
		this.rotateRightClockwise = false;
		this.rotateRightCounterClockwise = false;
		this.rotateUpClockwise = false;
		this.rotateUpCounterClockwise = false;
		this.rotateDownClockwise = false;
		this.rotateDownCounterClockwise = false;
	}

	draw() {
		for (let i = 0; i < this.cubies.length; i++) {
			this.cubies[i].draw();
		}
	}

	frontClockwise() {
		this.rotateFrontClockwise = true;
	}

	frontCounterClockwise() {
		this.rotateFrontCounterClockwise = true;
	}
	
	backClockwise() {
		this.rotateBackClockwise = true;
	}

	backCounterClockwise() {
		this.rotateBackCounterClockwise = true;
	}

	leftClockwise() {
		this.rotateLeftClockwise = true;
	}

	leftCounterClockwise() {
		this.rotateLeftCounterClockwise = true;
	}

	rightClockwise() {
		this.rotateRightClockwise = true;
	}

	rightCounterClockwise() {
		this.rotateRightCounterClockwise = true;
	}

	upClockwise() {
		this.rotateUpClockwise = true;
	}

	upCounterClockwise() {
		this.rotateUpCounterClockwise = true;
	}

	downClockwise() {
		this.rotateDownClockwise = true;
	}

	downCounterClockwise() {
		this.rotateDownCounterClockwise = true;
	}

	_backUpdate() {
		if (this.rotateBackClockwise) {
			this.animating = true;
			this.backFace.updateClockwise();
			if (this.backFace.finished()) {
				this.backFace.updateFace(rotateClockwise);
				this.rotateBackClockwise = false;
				this.animating = false;
			}
		}

		if (this.rotateBackCounterClockwise) {
			this.animating = true;
			this.backFace.updateCounterClockwise();
			if (this.backFace.finished()) {
				this.backFace.updateFace(rotateCounterClockwise);
				this.rotateBackCounterClockwise = false;
				this.animating = false;
			}
		}
	}

	_leftUpdate() {
		if (this.rotateLeftClockwise) {
			this.animating = true;
			this.leftFace.updateCounterClockwise();
			if (this.leftFace.finished()) {
				this.leftFace.updateFace(rotateCounterClockwise);
				this.rotateLeftClockwise = false;
				this.animating = false;
			}
		}

		if (this.rotateLeftCounterClockwise) {
			this.animating = true;
			this.leftFace.updateClockwise();
			if (this.leftFace.finished()) {
				this.leftFace.updateFace(rotateClockwise);
				this.rotateLeftCounterClockwise = false;
				this.animating = false;
			}
		}
	}

	_frontUpdate() {
		if (this.rotateFrontClockwise) {
			this.animating = true;
			this.frontFace.updateClockwise();
			if (this.frontFace.finished()) {
				this.frontFace.updateFace(rotateClockwise);
				this.rotateFrontClockwise = false;
				this.animating = false;
			}
		}

		if (this.rotateFrontCounterClockwise) {
			this.animating = true;
			this.frontFace.updateCounterClockwise();
			if (this.frontFace.finished()) {
				this.frontFace.updateFace(rotateCounterClockwise);
				this.rotateFrontCounterClockwise = false;
				this.animating = false;
			}
		}
	}

	_upUpdate() {
		if (this.rotateUpClockwise) {
			this.animating = true;
			this.upFace.updateCounterClockwise();
			if (this.upFace.finished()) {
				this.upFace.updateFace(rotateClockwise);
				this.rotateUpClockwise = false;
				this.animating = false;
			}
		}

		if (this.rotateUpCounterClockwise) {
			this.animating = true;
			this.upFace.updateClockwise();
			if (this.upFace.finished()) {
				this.upFace.updateFace(rotateCounterClockwise);
				this.rotateUpCounterClockwise = false;
				this.animating = false;
			}
		}
	}

	_downUpdate() {
		if (this.rotateDownClockwise) {
			this.animating = true;
			this.downFace.updateClockwise();
			if (this.downFace.finished()) {
				this.downFace.updateFace(rotateCounterClockwise);
				this.rotateDownClockwise = false;
				this.animating = false;
			}
		}

		if (this.rotateDownCounterClockwise) {
			this.animating = true;
			this.downFace.updateCounterClockwise();
			if (this.downFace.finished()) {
				this.downFace.updateFace(rotateClockwise);
				this.rotateDownCounterClockwise = false;
				this.animating = false;
			}
		}
	}

	_rightUpdate() {
		if (this.rotateRightClockwise) {
			this.animating = true;
			this.rightFace.updateClockwise();
			if (this.rightFace.finished()) {
				this.rightFace.updateFace(rotateClockwise);
				this.rotateRightClockwise = false;
				this.animating = false;
			}
		}

		if (this.rotateRightCounterClockwise) {
			this.animating = true;
			this.rightFace.updateCounterClockwise();
			if (this.rightFace.finished()) {
				this.rightFace.updateFace(rotateCounterClockwise);
				this.rotateRightCounterClockwise = false;
				this.animating = false;
			}
		}
	}

	update() {
		this._backUpdate();
		this._leftUpdate();
		this._frontUpdate();
		this._upUpdate();
		this._downUpdate();
		this._rightUpdate();
	}
}

