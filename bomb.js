function bomb(x,y,explRadius,radius){
	this.bombX=x;
	this.bombY=y;
	this.radius = radius;
	this.explRadius = explRadius;
	this.isHit=function(x1,y2){
		return false;
	}
	this.draw=function(context){
		context.beginPath();
		context.setLineDash([5]);
		context.arc(this.bombX,this.bombY,this.radius,2*Math.PI,false);
		context.stroke();
		context.beginPath();
		context.setLineDash([]);
		context.arc(this.bombX,this.bombY,this.explRadius,2*Math.PI,false);
		context.stroke();
	}
}