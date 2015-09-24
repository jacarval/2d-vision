var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');

var point = new Point(canvas.width / 2, canvas.height / 2);
// var ray = new Ray(point);
var poly = new Polygon(100, 200, 30, 6, 'red'); 
var poly2 = new Polygon(400, 300, 40, 8, 'red');
var poly3 = new Polygon(500, 250, 30, 3, 'red');
var poly4 = new Polygon(200, 400, 40, 7, 'red');
var poly5 = new Polygon(700, 400, 50, 4, 'red');
var poly6 = new Polygon(500, 75, 50, 10, 'red');

var a = new Point(120, 180);
var b = new Point(200, 180);
var segment = new Segment(a, b);
var globalSegments = []

globalSegments = globalSegments.concat(poly.segments);
globalSegments = globalSegments.concat(poly2.segments);
globalSegments = globalSegments.concat(poly3.segments);
globalSegments = globalSegments.concat(poly4.segments);
globalSegments = globalSegments.concat(poly5.segments);
globalSegments = globalSegments.concat(poly6.segments);
globalSegments = globalSegments.concat([
    // border
    {startPoint:{x:0,y:0}, endPoint:{x:canvas.width,y:0}},
    {startPoint:{x:canvas.width,y:0}, endPoint:{x:canvas.width,y:canvas.height}},
    {startPoint:{x:canvas.width,y:canvas.height}, endPoint:{x:0,y:canvas.height}},
    {startPoint:{x:0,y:canvas.height}, endPoint:{x:0,y:0}},
]);

function getIntersection(ray, segment){
    // T1 and T2 are scalars of the lines being compared
    var r_px = ray.origin.x;
    var r_py = ray.origin.y;
    var r_dx = ray.direction.x-ray.origin.x;
    var r_dy = ray.direction.y-ray.origin.y;

    var s_px = segment.startPoint.x;
    var s_py = segment.startPoint.y;
    var s_dx = segment.endPoint.x-segment.startPoint.x;
    var s_dy = segment.endPoint.y-segment.startPoint.y;

    // the lines are parallel and do not intersect
    if (r_dx * s_dy == r_dy * s_dx) {
        return null;
    }

    // When T2 0<T2<1 that means that the point in question is between the startPoint (0)
    // and the endPoint (1)
    var T2 = (r_dx*(s_py-r_py)+r_dy*(r_px-s_px))/(s_dx*r_dy-s_dy*r_dx);

    // When T1 > 0 that means the segment is in front of the ray
    // When T1 < 0 the scalar is negative and so we're looking at the line behind us
    if (r_dx){
        var T1 = (s_px+s_dx*T2-r_px)/r_dx;
    } else {
        var T1 = (s_py+s_dy*T2-r_py)/r_dy;
    }

    document.getElementById('T1').innerText = 'T1: ' + T1;
    document.getElementById('T2').innerText = 'T2: ' + T2;

    // Intersections occur when 0<T2<1 and T1 > 0
    if (0 < T2 && T2 < 1 && T1 > 0){
        return {
            x: r_px+(r_dx*T1),
            y: r_py+(r_dy*T1),
            param: T1
        }
    }
    return null;
}

document.addEventListener('mousemove', function (e){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // draw all of the segments
    for(var i=0;i<globalSegments.length;i++){
        var seg = globalSegments[i];
        ctx.beginPath();
        ctx.moveTo(seg.startPoint.x,seg.startPoint.y);
        ctx.lineTo(seg.endPoint.x,seg.endPoint.y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#C5C5C5";
        ctx.stroke();
    }

    // grab x and y of the client
    var mouseX = e.clientX;
    var mouseY = e.clientY;

    // get all the points at the corners of all the segments
    var points = (function(segments){
        var _points = [];
        segments.forEach(function(seg){
            _points.push(seg.startPoint, seg.endPoint);
        });
        return _points;
    })(globalSegments);

    // remove to points where segments intersect
    var uniquePoints = (function(points){
        var set = {};
        return points.filter(function(p){
            var key = p.x+','+p.y;
            if (key in set) {
                return false;
            }
            else {
                set[key] = true;
                return true;
            }
        });
    })(points);

    // get the angles for each unique point
    var angles = (function(points){
        var _angles = [];
        points.forEach(function(p){
            var angle = Math.atan2(p.y - mouseY, p.x - mouseX);
            p.angle = angle;
            _angles.push(angle - 0.00001, angle, angle + 0.00001);
        });
        return _angles;
    })(uniquePoints);

    // get the closest intersection at each angle
    var intersects = (function(angles){
        var _intersects = [];
        angles.forEach(function(angle){
            var dx = Math.cos(angle);
            var dy = Math.sin(angle);

            var ray = {
                origin: {x: mouseX, y: mouseY},
                direction: {x: mouseX + dx, y: mouseY + dy}
            }

            var closestIntersect = null;
            globalSegments.forEach(function(s){
                var intersect = getIntersection(ray, s);
                if (intersect) {
                    if (!closestIntersect || intersect.param < closestIntersect.param){
                        closestIntersect = intersect;
                    }
                }
            });
            if (closestIntersect) {
                closestIntersect.angle = angle;
                _intersects.push(closestIntersect);
            }
        });
        return _intersects;
    })(angles);

    // draw ray to each intersection
    intersects.forEach(function(intersect){
        ctx.beginPath();
        ctx.moveTo(mouseX, mouseY);
        ctx.lineTo(intersect.x, intersect.y);
        ctx.stroke();
    });

    // sort intersections by angle
    intersects = intersects.sort(function(a,b){
        return a.angle-b.angle;
    });

    // draw visiblity polygon
    ctx.moveTo(intersects[0].x, intersects[0].y);
    intersects.forEach(function(point, index){
        if (index !== 0) {
            ctx.lineTo(point.x, point.y);
        }
    });
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fill();

    document.getElementById('x').innerText = 'x: ' + mouseX;
    document.getElementById('y').innerText = 'y: ' + mouseY;
});