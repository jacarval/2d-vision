function Polygon(x, y, radius, sides, color) {
	if (sides < 3) throw new Error('Invalid Polygon')
	var self = this;

	this.x = x;
	this.y = y;
	this.radius = radius;
	this.sides = sides;
	this.color = color;
	this.corners = (function (x, y) {

		var corners = [[x, y]];
		var a = (Math.PI * 2)/self.sides;

		for (var i = 0; i < self.sides; i++) {
			var x = self.radius * Math.cos(a * i);
			var y = self.radius * Math.sin(a * i);

			corners.push([x, y]);
		}	

		return corners;
		
	}());

	this.draw = function(ctx) {
		if (this.sides < 3) return;
		
		var a = (Math.PI * 2)/this.sides;
		
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.beginPath();
		ctx.moveTo(this.corners[0][0], this.corners[0][1]);
		
		for (var i = 1; i < this.corners.length; i++) {
			var x = this.corners[i][0];
			var y = this.corners[i][1];

			ctx.lineTo(x, y);
		}	

		ctx.closePath();
		ctx.stroke();
		ctx.restore();
	}
}

function Point(x, y) {
	this.x = x;
	this.y = y;
	this.shape = new Polygon(x, y, 5, 6, 'red', ctx);
	this.draw = function(ctx) {
		this.shape.draw();
	}
}

function Line(startPoint) {
	this.startPoint = startPoint;
	this.drawLineFromAngle = function(angle, ctx) {
		// equation to get line end from an angle
		var x2 = this.startPoint.x + canvas.width * Math.cos(angle * Math.PI/180.0);
		var y2 = this.startPoint.y + canvas.height * Math.sin(angle * Math.PI/180.0);
		ctx.beginPath();
		ctx.moveTo(this.startPoint.x, this.startPoint.y);
		ctx.lineTo(x2, y2);
		ctx.closePath();
		ctx.stroke();
	};
}

