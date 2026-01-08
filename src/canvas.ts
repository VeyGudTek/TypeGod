var c = document.getElementById("canvas") as HTMLCanvasElement;
var ctx = c.getContext("2d") as CanvasRenderingContext2D;
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.stroke();