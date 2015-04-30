function MoveRange(tx,ty,color){
	this.tx = tx;
	this.ty = ty;
	this.color = color;
	this.angle = 0;
	this.length = 30;
	
	this.draw = function(context){
		context.strokeStyle = this.color;
		
		context.beginPath();
		context.moveTo(this.tx,this.ty);
		var p = this.toWorldSpace(this.length, 4*this.length);
		context.lineTo(p[0], p[1]);
		context.closePath();
		context.stroke();
	
		context.beginPath();
		context.moveTo(this.tx,this.ty);
		var p = this.toWorldSpace(-this.length, 4*this.length);
		context.lineTo(p[0], p[1]);
		context.closePath();
		context.stroke();
	
	}
	
	this.toWorldSpace = function(x, y) {
		var wx = x * Math.cos(this.angle) - y * Math.sin(this.angle);
		var wy = x * Math.sin(this.angle) + y * Math.cos(this.angle);
		wx += this.tx;
		wy += this.ty;
		return [wx, wy];
	}

}