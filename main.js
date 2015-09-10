var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');

var point = new Point(canvas.width / 2, canvas.height / 2);
var ray = new Ray(point);
var poly = new Polygon(100, 100, 75, 4, 'red'); 

var a = new Point(50, 100);
var b = new Point(100, 50);
var segment = new Segment(a, b);

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




    segment.draw(ctx)
    ray.drawLineFromAngle(angleInDegrees, ctx);

    poly.draw(ctx);

    // poly.segments.forEach(function(segment) {
    //     var intersection = getIntersection(ray, segment);
    //     if (intersection){
    //         console.log(intersection);
    //          var x = Math.pow((intersection.x-ray.origin.x),2);
    //          var y = Math.pow((intersection.y-ray.origin.y),2);
    //          var newMagnitude = Math.sqrt(x+y);
    //          ray.magnitude = new Point(newMagnitude,newMagnitude);
    //     }
    //     else {
    //         ray.magnitude = new Point(450,450);
    //     }
    // });

    var intersection = getIntersection(ray, poly.segments[0]);
    if (intersection){
         var x = Math.pow((intersection.x-ray.origin.x),2);
         var y = Math.pow((intersection.y-ray.origin.y),2);
         var newMagnitude = Math.sqrt(x+y);
         ray.magnitude = new Point(newMagnitude,newMagnitude);
    }
    else {
        ray.magnitude = new Point(450,450);
    }
    console.log('intersection: ', intersection);

    document.getElementById('x').innerText = 'x: ' + x;
    document.getElementById('y').innerText = 'y: ' + y;
});

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

    // When T2 0<T2<1 that means that the point in question is between the startPoint (0)
    // and the endPoint (1)
    var T2 = (r_dx*(s_py-r_py)+r_dy*(r_px-s_px))/(s_dx*r_dy-s_dy*r_dx);

    // When T1 > 0 that means the segment is in front of the ray
    // When T1 < 0 the scalar is negative and so we're looking at the line behind us
    var T1 = (s_px+s_dx*T2-r_px)/r_dx;

    document.getElementById('T1').innerText = 'T1: ' + T1;
    document.getElementById('T2').innerText = 'T2: ' + T2;

    // Intersections occur when 0<T2<1 and T1 > 0
    if (0 < T2 && T2 < 1 && T1 > 0){
        return new Point(r_px+(r_dx*T1), r_py+(r_dy*T1));
    }
    return null;
}


point.draw(ctx);
segment.draw(ctx);
poly.draw(ctx);