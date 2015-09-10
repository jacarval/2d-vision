

function Point(x, y) {
	this.x = x;
	this.y = y;
}

function Ray(origin) {
	this.origin = origin;
	this.direction = new Point(0, 0);
	this.magnitude = 450;
	this.drawLineFromAngle = function(angle, ctx) {
		// equation to get line end from an angle
		this.direction.x = this.origin.x + this.magnitude * Math.cos(angle * Math.PI/180.0);
		this.direction.y = this.origin.y + this.magnitude * Math.sin(angle * Math.PI/180.0);
		ctx.beginPath();
		ctx.moveTo(this.origin.x, this.origin.y);
		ctx.lineTo(this.direction.x, this.direction.y);
		ctx.closePath();
		ctx.stroke();
	};
}

function Segment(startPoint, endPoint){
	this.startPoint = startPoint;
	this.endPoint = endPoint;
	this.draw = function(ctx) {
		ctx.beginPath();
		ctx.moveTo(startPoint.x, startPoint.y);
    	ctx.lineTo(endPoint.x, endPoint.y);
    	ctx.closePath();
    	ctx.stroke();
	}
}

