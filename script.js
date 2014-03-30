var stage = new Kinetic.Stage({
container: 'container',
width: 1080,
height: 720
});

var _p1Ships = [];
var _p2Ships = [];

init();

// init function
function init() {
	
	// Add Ships
	for (var i = 1; i <= 3; i++) {
		_p1Ships.push(new KShip("#ff0000", 100, 200 * i));
		_p2Ships.push(new KShip("#0000ff", 980, 200 *i));
	}
}

function KShip(color, x, y) {
	this.layer = new Kinetic.Layer();
	this.x = x;
	this.y = y;
	this.color = color;
	this.mover = new Mover(x, y);
	this.mover.incStatus();
	
	this.body = new Kinetic.Circle({
		x: this.x,
		y: this.y,
		radius: 10,
		fill: this.color,
	});
	
	this.topWing = new Kinetic.Line({
		points: [this.x, this.y, this.x, this.y-30, this.x+10, this.y-30, this.x-10, this.y-30],
		stroke: this.color,
		strokeWidth: 1
	});

	this.bottomWing = new Kinetic.Line({
		points: [this.x, this.y, this.x, this.y+30, this.x+10, this.y+30, this.x-10, this.y+30],
		stroke: this.color,
		strokeWidth: 1
	});
	
	this.hideTopWing = function() {
		this.topWing.hide();
		this.layer.draw();
	}

	this.hideBottomWing = function() {
		this.bottomWing.hide();
		this.layer.draw();
	}
	
	this.move = function(dx, dy) {
		this.layer.move(dx, dy);
		this.mover.move(dx, dy);
		this.layer.draw();
	}
	
	var obj = this;
	this.layer.on('mousedown', function()  {
		var val = obj.mover.incStatus();
		if (val) {
			obj.move(val[1], val[2]);
			this.draw();
		}
	});
	
	this.layer.add(this.body);
	this.layer.add(this.topWing);
	this.layer.add(this.bottomWing);

	// add the layer to the stage
	stage.add(this.layer);
}

function Mover(x, y) {
	this.layer = new Kinetic.Layer();
	this.x = x;
	this.y = y;
	this.status = -1;
	this.angle1 = 0;
	this.angleDif = Math.PI / 5;
	this.angle2 = this.angleDif;
	this.length = 20;
	this.maxLength = 300;
	this.speed = .1;

	this.line1 = new Kinetic.Line({
		points: [this.x, this.y, this.x + Math.cos(this.angle1) * this.maxLength, this.y + Math.sin(this.angle1) * this.maxLength],
		stroke: "#000000",
		strokeWidth: 1
	});
	
	this.line2 = new Kinetic.Line({
		points: [this.x, this.y, this.x + Math.cos(this.angle2) * this.maxLength, this.y + Math.sin(this.angle2) * this.maxLength],
		stroke: "#000000",
		strokeWidth: 1
	});

	this.layer.add(this.line1);
	this.layer.add(this.line2);
	stage.add(this.layer);
	
	this.incStatus = function() {
		this.status = (this.status + 1) % 4;
		if (this.status == 0) {
			this.layer.hide();
		}
		else if (this.status == 1) {
			this.layer.show();
			this.startRotation();
		}
		else if (this.status == 2) {
			this.stopRotation();
			this.startExtending();
		}
		else if (this.status == 3) {
			this.stopExtending();
			this.layer.hide();
			return this.changeCoordinates();
		}
	}
	
	this.changeCoordinates = function() {
		var angle = this.angle1 + (Math.random() * this.angleDif);
		var dx = Math.cos(angle) * this.length;
		var dy = Math.sin(angle) * this.length;
		return ["move", dx, dy];
	}
	
	this.startRotation = function() {
		this.interval = setInterval(
			(function(self) {         
				return function() {   
					self.rotate();
				}
			})(this),
			40
		);
	}
	
	this.stopRotation = function() {
		clearInterval(this.interval);
	}
	
	this.startExtending = function() {
		this.interval = setInterval(
			(function(self) {         
				return function() {   
					self.extend();
				}
			})(this),
			40
		);
	}
	
	this.stopExtending = function() {
		clearInterval(this.interval);
	}
	
	this.move = function(dx, dy) {
		this.layer.move(dx, dy);
		this.layer.draw();
	}
	
	this.rotate = function() {
		this.angle1 = (this.angle1 + this.speed);
		this.angle2 = (this.angle2 + this.speed);
		this.line1.setPoints([this.x, this.y, this.x + Math.cos(this.angle1) * this.maxLength, this.y + Math.sin(this.angle1) * this.maxLength]);
		this.line2.setPoints([this.x, this.y, this.x + Math.cos(this.angle2) * this.maxLength, this.y + Math.sin(this.angle2) * this.maxLength]);
		this.layer.draw();
	}
	
	this.extend = function() {
		this.length = (this.length + 3) % this.maxLength;//(this.length + .01 * (this.length)) % (this.maxLength);
		this.line1.setPoints([this.x, this.y, this.x + Math.cos(this.angle1) * this.length, this.y + Math.sin(this.angle1) * this.length]);
		this.line2.setPoints([this.x, this.y, this.x + Math.cos(this.angle2) * this.length, this.y + Math.sin(this.angle2) * this.length]);
		this.layer.draw();
	}
	
}