function ShipTriangle(tx,ty,color){
	this.tx = tx;
	this.ty = ty;
	this.color = color;
	this.heightLength= 20;
	this.sideLength=(2*this.heightLength)/Math.sqrt(3); 
	this.wingY=((this.sideLength/4));
	this.wingX=(this.sideLength/4);
	this.angle = 0;
	this.angleMove = 0;
	this.length=90;
	this.state = 0;



	this.draw = function(context){
		context.fillStyle = this.color;
		context.strokeStyle = this.color;


//Body Triangle	
		context.beginPath();
		var p = this.toWorldSpace(0,-(this.heightLength/2));
		context.moveTo(p[0], p[1]);
		p = this.toWorldSpace(this.sideLength/2,(this.heightLength/2)); 
		context.lineTo(p[0], p[1]);
		p = this.toWorldSpace(-this.sideLength/2,(this.heightLength/2))
		context.lineTo(p[0], p[1]);
		p = this.toWorldSpace(0,-(this.heightLength/2))
		context.lineTo(p[0], p[1]);
		context.closePath();
		context.fill();

// //Right Wing
		context.beginPath();
		var p = this.toWorldSpace(this.wingX,0);
		context.moveTo(p[0], p[1]);
		p=this.toWorldSpace(this.sideLength,0);
		context.lineTo(p[0], p[1]);
		context.stroke();

		context.beginPath();
		var p = this.toWorldSpace(this.sideLength,this.heightLength/2)
		context.moveTo(p[0], p[1]);
		p=this.toWorldSpace(this.sideLength,-this.heightLength/2);
		context.lineTo(p[0], p[1]);
		context.closePath();
		context.stroke();

// //Left Wing
		context.beginPath();
		var p = this.toWorldSpace(-this.wingX,0);
		context.moveTo(p[0], p[1]);
		p=this.toWorldSpace(-this.sideLength,0);
		context.lineTo(p[0], p[1]);
		context.stroke();

		context.beginPath();
		var p = this.toWorldSpace(-this.sideLength,this.heightLength/2)
		context.moveTo(p[0], p[1]);
		p=this.toWorldSpace(-this.sideLength,-this.heightLength/2);
		context.lineTo(p[0], p[1]);
		context.closePath();
		context.stroke();

		if(this.state==1){
			context.strokeStyle = this.color;
			context.beginPath();
			context.moveTo(this.tx,this.ty);
			var p = this.toWorldSpace(this.length*Math.sin(this.angleMove+.4),-(this.length)*Math.cos(this.angleMove+.4));
			context.lineTo(p[0], p[1]);
			context.closePath();
			context.stroke();
		
			context.beginPath();
			context.moveTo(this.tx,this.ty);
			var p = this.toWorldSpace(this.length*(Math.sin(this.angleMove-.4)), -Math.cos(this.angleMove-.4)*(this.length));
			context.lineTo(p[0], p[1]);
			context.closePath();
			context.stroke();

		}

		if(this.state == 2){

			context.strokeStyle = this.color;
			context.beginPath();
			context.moveTo(this.tx,this.ty);
			var p = this.toWorldSpace(this.length*Math.sin(this.angleMove+.4),-(this.length)*Math.cos(this.angleMove+.4));
			context.lineTo(p[0], p[1]);
			context.closePath();
			context.stroke();
		
			context.beginPath();
			context.moveTo(this.tx,this.ty);
			var p = this.toWorldSpace(this.length*(Math.sin(this.angleMove-.4)), -Math.cos(this.angleMove-.4)*(this.length));
			context.lineTo(p[0], p[1]);
			context.closePath();
			context.stroke();

		}
		if(this.state == 3){
			
		}


	}



	this.toWorldSpace = function(x, y) {
		var wx = x * Math.cos(this.angle) - y * Math.sin(this.angle);
		var wy = x * Math.sin(this.angle) + y * Math.cos(this.angle);
		wx += this.tx;
		wy += this.ty;
		return [wx, wy];
	}






}