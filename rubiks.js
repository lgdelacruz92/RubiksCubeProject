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

		this.a = 0.0;
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

	rotateAroundInternalAxis(mat) {
		this.topLeftFrontI = multVec(mat, createVector(-this.s, -this.s, this.s));
		this.topRightFrontI = multVec(mat, createVector(this.s, -this.s, this.s));
		this.bottomLeftFrontI = multVec(mat, createVector(-this.s, this.s, this.s));
		this.bottomRightFrontI = multVec(mat, createVector(this.s, this.s, this.s));
		this.topLeftBackI = multVec(mat, createVector(-this.s, -this.s, -this.s));
		this.topRightBackI = multVec(mat, createVector(this.s, -this.s, -this.s));
		this.bottomLeftBackI = multVec(mat, createVector(-this.s, this.s, -this.s));
		this.bottomRightBackI = multVec(mat, createVector(this.s, this.s, -this.s));
		this.update();
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
		this.backIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		this.leftIndices = [0, 3, 6, 9, 12, 15, 18, 21, 24];
		this.a = 0;
		this.animating = false;
	}

	draw() {
		for (let i = 0; i < this.cubies.length; i++) {
			this.cubies[i].draw();
		}
	}
	
	animating() {
		return this.animating;
	}

	rotateBack(val) {
		this.animating = true;
		let mat = [
			[cos(radians(this.a)), -sin(radians(this.a)), 0],
			[sin(radians(this.a)), cos(radians(this.a)), 0],
			[0, 0, 1]
		];
		for (let i = 0; i < this.backIndices.length; i++) {
			this.cubies[this.backIndices[i]].rotateAroundOrigin(mat);
		}

	}

	rotate(mat) {
		for (let i = 0; i < this.cubies.length; i++) {
			this.cubies[i].rotateAroundOrigin(mat);
		}
	}
}

