function Ship(cx, cy, color) {
	this.cx = cx;
	this.cy = cy; 
	this.color = color;
	this.bodyRadius = 10;
	this.angle = 0;
	this.hasWing1 = true;
	this.hasWing2 = true;

	/**
		These methods are called from the main script file.
	*/
	this.draw = function(context) {
		context.fillStempYle = this.color;
		context.strokeStempYle = this.color;
		context.beginPath();
		context.arc(this.cx, this.cy, this.bodyRadius, 0, Math.PI * 2, false);
		context.fill();

		if (this.hasWing1) {
			context.beginPath();
			var p = this.objectToWorldSpace(0, this.bodyRadius);
			context.moveTo(p[0], p[1]);
			p = this.objectToWorldSpace(0, 3 * this.bodyRadius);
			context.lineTo(p[0], p[1]);
			context.closePath();		
			context.stroke();

			context.beginPath();
			p = this.objectToWorldSpace(-this.bodyRadius, 3 * this.bodyRadius);
			context.moveTo(p[0], p[1]);
			p = this.objectToWorldSpace(this.bodyRadius, 3 * this.bodyRadius);
			context.lineTo(p[0], p[1]);
			context.closePath();		
			context.stroke();
		}

		if (this.hasWing2) {
			context.beginPath();
			var p = this.objectToWorldSpace(0, -this.bodyRadius);
			context.moveTo(p[0], p[1]);
			p = this.objectToWorldSpace(0, -3 * this.bodyRadius);
			context.lineTo(p[0], p[1]);
			context.closePath();		
			context.stroke();

			context.beginPath();
			var p = this.objectToWorldSpace(-this.bodyRadius, -3 * this.bodyRadius);
			context.moveTo(p[0], p[1]);
			p = this.objectToWorldSpace(this.bodyRadius, -3 * this.bodyRadius);
			context.lineTo(p[0], p[1]);
			context.closePath();		
			context.stroke();
		}
	}

	// Params expected to be in world space
	// Tests only the bounding box of the ship body itself (not the wings)
	this.pointIsInBodyBox = function(worldX, worldY) {
		var objectPoint = this.worldToObjectSpace(worldX, worldY);
		var x = objectPoint[0];
		var y = objectPoint[1];
		return (x <= this.bodyRadius && x >= -this.bodyRadius &&
			y <= this.bodyRadius && y >= -this.bodyRadius);
	}

	// Params expected to be in world space
	// Tests only the bounding box of the two wings separately (and only for wings, if any, that exist)
	this.pointIsInWingBox = function(worldX, worldY) {
		var objectPoint = this.worldToObjectSpace(worldX, worldY);
		var x = objectPoint[0];
		var y = objectPoint[1];
		if (this.hasWing1 && x <= this.bodyRadius && x >= -this.bodyRadius &&
			y <= this.bodyRadius * 3 && y >= this.bodyRadius) {
			return true;
		}
		if (this.hasWing2 && x <= this.bodyRadius && x >= -this.bodyRadius &&
			y >= this.bodyRadius * -3 && y <= -this.bodyRadius) {
			return true;
		}
		return false;
	}

	/**
		Treat all following methods as private -- Don't call them from outside of Ship
	*/
	// Params expected to be in object space
	this.objectToWorldSpace = function(objectX, objectY) {
		var worldX = objectX * Math.cos(this.angle) - objectY * Math.sin(this.angle);
		var worldY = objectX * Math.sin(this.angle) + objectY * Math.cos(this.angle);
		worldX += this.cx;
		worldY += this.cy;
		return [worldX, worldY];
	}

	// Params expected to be in world space
	this.worldToObjectSpace = function(worldX, worldY) {
		var tempX = worldX - this.cx;
		var tempY = worldY - this.cy;
		var objectX = tempX * Math.cos(this.angle) + tempY * Math.sin(this.angle);
		var objectY = -tempX * Math.sin(this.angle) + tempY * Math.cos(this.angle);
		return [objectX, objectY];
	}

}