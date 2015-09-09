function Polygon(x, y, radius, sides, color, ctx) {
	if (sides < 3) throw new Error('Invalid Polygon')
	
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.sides = sides;
	this.color = color;
	this.ctx = ctx;

	this.draw = function() {
		if (this.sides < 3) return;
		
		var a = (Math.PI * 2)/this.sides;
		
		this.ctx.save();
		this.ctx.translate(this.x, this.y);
		this.ctx.beginPath();
		this.ctx.moveTo(this.radius, 0);
		
		for (var i = 1; i < this.sides; i++) {
			this.ctx.lineTo(this.radius * Math.cos(a * i), this.radius * Math.sin(a * i));
		}	

		this.ctx.closePath();
		this.ctx.stroke();
		this.ctx.restore();
	}
}

function Point(x, y, ctx) {
	this.x = x;
	this.y = y;
	this.shape = new Polygon(x, y, 5, 6, 'red', ctx);
	this.draw = function() {
		this.shape.draw();
	}
}

function Line(startPoint, ctx) {
	this.startPoint = startPoint;
	this.ctx = ctx;
	this.drawLineFromAngle = function(angle) {
		// equation to get line end from an angle
		var x2 = this.startPoint.x + canvas.width * Math.cos(angle * Math.PI/180.0);
		var y2 = this.startPoint.y + canvas.height * Math.sin(angle * Math.PI/180.0);
		this.ctx.beginPath();
		this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
		this.ctx.lineTo(x2, y2);
		this.ctx.closePath();
		this.ctx.stroke();
	};
}

