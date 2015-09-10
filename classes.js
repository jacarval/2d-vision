function Polygon(x, y, radius, sides, color) {
	if (sides < 3) throw new Error('Invalid Polygon')
	var self = this;

	this.x = x;
	this.y = y;
	this.radius = radius;
	this.sides = sides;
	this.color = color;
	this.corners= [];
	this.segments = (function () {

		var segments = [];
		var corners = [];
		var a = (Math.PI * 2)/self.sides;

		var x = self.x + self.radius * Math.cos(a * 0);
		var y = self.y + self.radius * Math.sin(a * 0);
		corners.push([x,y]);
		for (var i = 1; i < self.sides; i++) {
			var x1 = corners[i-1][0]; 
			var y1 = corners[i-1][1];
			var startPoint = new Point(x1,y1);

			var x2 = self.x + self.radius * Math.cos(a*i);
			var y2 = self.y + self.radius * Math.sin(a*i)
			var endPoint = new Point(x2,y2);

			segments.push(new Segment(startPoint, endPoint));
			corners.push([x2,y2]);
		}
		var x1 = corners[corners.length-1][0]; 
		var y1 = corners[corners.length-1][1];
		var startPoint = new Point(x1,y1);

		var x2 = corners[0][0];
		var y2 = corners[0][1];
		var endPoint = new Point(x2,y2);

		segments.push(new Segment(startPoint, endPoint));

		// corners.push(corners[corners.length-1][0], corners[corners.length-1][1]);
		self.corners = corners;
		return segments;
		
	}());

	this.draw = function(ctx) {
		if (this.sides < 3) return;
		
		// var a = (Math.PI * 2)/this.sides;
		
		// ctx.save();
		// ctx.translate(this.x, this.y);
		ctx.beginPath();
		ctx.moveTo(this.corners[0][0], this.corners[0][1]);
		
		for (var i = 1; i < this.corners.length; i++) {
			var x = this.corners[i][0];
			var y = this.corners[i][1];

			ctx.lineTo(x, y);
		}	



		ctx.closePath();
		ctx.stroke();
		// ctx.restore();
	}
}

function Point(x, y) {
	this.x = x;
	this.y = y;
	// this.shape = new Polygon(x, y, 5, 6, 'red');
	this.draw = function(ctx) {
		// this.shape.draw(ctx);
	}
	this.subtract = function(point) {
		var x = this.x - point.x;
		var y = this.y - point.y;
		return new Point(x, y);
	}
}

function Ray(origin) {
	this.origin = origin;
	this.magnitude = new Point(1000, 1000);
	this.direction = this.magnitude.subtract(origin);
	this.drawLineFromAngle = function(angle, ctx) {
		// equation to get line end from an angle
		this.direction.x = this.origin.x + this.magnitude.x * Math.cos(angle * Math.PI/180.0);
		this.direction.y = this.origin.y + this.magnitude.y * Math.sin(angle * Math.PI/180.0);
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
	this.direction = endPoint.subtract(startPoint)
	this.draw = function(ctx) {
		ctx.beginPath();
		ctx.moveTo(startPoint.x, startPoint.y);
    	ctx.lineTo(endPoint.x, endPoint.y);
    	ctx.closePath();
    	ctx.stroke();
	}
}

