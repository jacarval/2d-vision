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