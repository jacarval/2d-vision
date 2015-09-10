var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');

var point = new Point(canvas.width / 2, canvas.height / 2);
var ray = new Ray(point);
var poly = new Polygon(100, 100, 75, 4, 'red'); 

document.addEventListener('mousemove', function (e){
    // grab x and y of the client
    var x = e.clientX;
    var y = e.clientY;

    // find difference between the two points
    var deltaX = x - point.x;
    var deltaY = y - point.y;

    // acquire angle
    var angleInDegrees = Math.atan2(deltaY, deltaX) * 180/Math.PI;


    ctx.clearRect(0,0,canvas.width,canvas.height);


    point.draw(ctx);
    ray.drawLineFromAngle(angleInDegrees, ctx);
    poly.draw(ctx);


});

function getIntersection(r, s){
    // T1 and T2 are scalars of the lines being compared

    // When T2 0<T2<1 that means that the point in question is between the startPoint (0)
    // and the endPoint (1)
    var T2 = (r.vector.x*(s.startPoint.x-r.origin.y)+r.vector.y*(r.origin.x-s.startPoint.x))/
                (s.endPoint.x*r.vector.y-s.endPoint.y*r.vector.x);

    // When T1 > 0 that means the segment is in front of the ray
    // When T1 < 0 the scalar is negative and so we're looking at the line behind us
    var T1 = (s.startPoint.x+s.endPoint.x*T2-r.origin.x)/r.vector.x;

    // Intersections occur when 0<T2<1 and T1 > 0
    if (0<T2<1 && T1 > 0){
        return new Point(r.origin.x+(r.vector.x*T1),r.origin.y+(r.vector.y*T1));
    }
    return null;
}


point.draw(ctx);
poly.draw(ctx);