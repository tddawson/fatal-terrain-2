var context;
var positive = 1;
init();
var moveRange;
// init function
function init() {
	
	var canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	moveRange = new MoveRange(300,300, "blue");
	moveRange.draw(context);


	// setInterval(function(){
	// 	context.clearRect(0,0,canvas.width,canvas.height);	
	// 	moveRange.draw(context);
	// 	moveRange.angle+=.05;
	// },40);


}

function distance(){

	setInterval(function(){
		context.clearRect(0,0,canvas.width,canvas.height);	
		moveRange.draw(context);

		moveRange.length+=(2*positive);
		if(moveRange.length>60){;
			positive=-1;
		}
		if(moveRange.length==30){
			positive=1;
		}
	},40);
	
}

function direction(){

	setInterval(function(){
		context.clearRect(0,0,canvas.width,canvas.height);	
		moveRange.draw(context);
		moveRange.angle+=.5;
	},40);

}




