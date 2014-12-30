function Ship(cx, cy, color) {
	this.cx = cx;
	this.cy = cy; 
	this.color = color;
	this.bodySize = 10;
	this.angle = 0;

	this.draw = function(context) {
		context.fillStyle = this.color;
		context.strokeStyle = this.color;
		context.beginPath();
		context.arc(this.cx, this.cy, this.bodySize, 0, Math.PI * 2, false);
		context.fill();

		context.beginPath();
		var p = this.toWorldSpace(0, this.bodySize);
		context.moveTo(p[0], p[1]);
		p = this.toWorldSpace(0, 3 * this.bodySize);
		context.lineTo(p[0], p[1]);
		context.closePath();		
		context.stroke();

		context.beginPath();
		p = this.toWorldSpace(-this.bodySize, 3 * this.bodySize);
		context.moveTo(p[0], p[1]);
		p = this.toWorldSpace(this.bodySize, 3 * this.bodySize);
		context.lineTo(p[0], p[1]);
		context.closePath();		
		context.stroke();

		context.beginPath();
		var p = this.toWorldSpace(0, -this.bodySize);
		context.moveTo(p[0], p[1]);
		p = this.toWorldSpace(0, -3 * this.bodySize);
		context.lineTo(p[0], p[1]);
		context.closePath();		
		context.stroke();

		context.beginPath();
		var p = this.toWorldSpace(-this.bodySize, -3 * this.bodySize);
		context.moveTo(p[0], p[1]);
		p = this.toWorldSpace(this.bodySize, -3 * this.bodySize);
		context.lineTo(p[0], p[1]);
		context.closePath();		
		context.stroke();
	}

	this.toWorldSpace = function(x, y) {
		var wx = x * Math.cos(this.angle) - y * Math.sin(this.angle);
		var wy = x * Math.sin(this.angle) + y * Math.cos(this.angle);
		wx += this.cx;
		wy += this.cy;
		return [wx, wy];
	}
}