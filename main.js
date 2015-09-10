var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');

var point = new Point(canvas.width / 2, canvas.height / 2);
var ray = new Line(point);
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


point.draw(ctx);
poly.draw(ctx);