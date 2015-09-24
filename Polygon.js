function Polygon(x, y, radius, sides, color) {
    if (sides < 3) throw new Error('Invalid Polygon')
    var self = this;

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.sides = sides;
    this.color = color;

    this.corners = (function() {
        var _corners = [];
        var a = Math.PI * 2 / self.sides;
        for (var i = 0; i < self.sides; i++) {
            var x = self.x + self.radius * Math.cos(a * i);
            var y = self.y + self.radius * Math.sin(a * i);  
            var p = new Point(x, y);
            _corners.push(p);
        }
        return _corners;
    }());

    this.segments = (function() {
        var _segments = [];
        for (var i = 0; i < self.sides; i++) {
            console.log(self.corners[i], self.corners[(i + 1) % self.sides])
            _segments.push(new Segment(self.corners[i], self.corners[(i + 1) % self.sides]))
        }
        return _segments;
    }());

    this.draw = function(ctx) {
        segments.forEach(function(s){
            s.draw(ctx)
        });
    }
}