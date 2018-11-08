require('./socketio');
require('./jquery');

var canvas = $("#game");
var ctx = canvas[0].getContext("2d");

var drawings = [];
var paint = false;

$(document).mouseup(function(e){
    paint = false;

    drawings = [];
})

canvas.mousedown(function(e){
    var drawPoint = [];
    paint = true;

    drawPoint.push(e.pageX - this.offsetLeft);
    drawPoint.push(e.pageY - this.offsetTop);
})

canvas.mousemove(function(e){
    if(!paint)
        return;

    var drawPoint = [];

    drawPoint.push(e.pageX - this.offsetLeft);
    drawPoint.push(e.pageY - this.offsetTop);

    drawings.push(drawPoint);

    draw();
})

canvas.mouseleave(function(e){
    if(!paint){
        return;
    }

    var drawPoint = [];

    drawPoint.push(e.pageX - this.offsetLeft);
    drawPoint.push(e.pageY - this.offsetTop);

    drawings.push(drawPoint);

    draw();
    drawings = [];
});

canvas.mouseenter(function(e){
    if(!paint){
        return;
    }

    var drawPoint = [];

    drawPoint.push(e.pageX - this.offsetLeft);
    drawPoint.push(e.pageY - this.offsetTop);

    drawings.push(drawPoint);
    console.log(drawings);
});

function draw(){
    //console.log(drawings);

    for(var i in drawings) {

        i = parseInt(i);

        var lastX = drawings[i][0];
        var lastY = drawings[i][1];

        var currentX = drawings[i+1][0];
        var currentY = drawings[i+1][1];

        ctx.beginPath();
        ctx.moveTo(lastX,lastY);
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = ctx.fillStyle = "#000";
        ctx.lineJoin = ctx.lineCap = "round";
        ctx.lineWidth = 5;
        ctx.closePath();
        ctx.stroke();

        drawings.shift();
    }
}

/*var canvas = $("#game");
var ctx = canvas[0].getContext("2d");
var lastX;
var lastY;
var paint = false;

gameInit();

function onMouseUp(e, self) {
    paint = false;
};
function onMouseDown(e, self) {
    lastX = e.pageX - self.offsetLeft;
    lastY = e.pageY - self.offsetTop;

    paint = true;
}
function onMouseMove(e, self) {
    if(!paint)
        return;

    var currentX = e.pageX - self.offsetLeft;
    var currentY = e.pageY - self.offsetTop;

    //console.log(this);

    ctx.beginPath();
    ctx.moveTo(lastX,lastY);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = ctx.fillStyle = "#000";
    ctx.lineJoin = ctx.lineCap = "round";
    ctx.lineWidth = 12;
    ctx.closePath();
    ctx.stroke();

    //console.log("LAST: " + lastX + " | LASTY: " + lastY + " | CURRENTX: " + currentX + " | CURRENTY: " + currentY);

    lastX = currentX;
    lastY = currentY;
};

function gameInit(){
    $(document).mouseup(function(e){
        onMouseUp(e, this);
    });
    canvas.mousedown(function(e){

        onMouseDown(e, this);
    });
    $(document).mousemove(function(e){
        onMouseMove(e, this);
    });
}


/*class CanvasDraw {

    canvas = $("#game");
    ctx = this.canvas.getContext("2d");
    lastY = null;
    lastX = null;

    constructor(){
        this.canvas.on('mouseup', this.onMouseUp(e));
        this.canvas.on('mousemove', this.onMouseMove(e));
        this.canvas.on('mousedown', this.onMouseDown(e));
    }

    onMouseUp(e){

    }

    onMouseMove(e){
        let currentX = e.touches[0].pageX;
        let currentY = e.touches[0].pageY;

        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX,this.lastY);
        this.ctx.lineTo(currentX, currentY);
        this.ctx.closePath();
        this.ctx.strokeStyle = "#000";

        this.ctx.lineWidth = 7;

        this.ctx.stroke();

        this.lastX = currentX;
        this.lastY = currentY;
    }

    onMouseDown(e){
        this.lastX = e.touches[0].pageX;
        this.lastY = e.touches[0].pageY;
    }


}*/

/*

/*
function addClick(x, y, dragging)
{
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}

$('#game').mousedown(function(e){
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;

    paint = true;
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    redraw();
});

$('#game').mousemove(function(e){
    if(paint){
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        redraw();
    }
});

$(document).mouseup(function(e){
    paint = false;
});

function redraw(){
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

    this.canvasCtx.fillStyle = this.canvasCtx.strokeStyle = this.brush.getColor(s),
        this.canvasCtx.lineWidth = r,
        this.canvasCtx.lineJoin = this.canvasCtx.lineCap = "round",
        this.canvasCtx.beginPath(),
        this.canvasCtx.moveTo(t, e),
        this.canvasCtx.lineTo(n, o),
        this.canvasCtx.closePath(),
        this.canvasCtx.stroke()

    context.strokeStyle = context.fillStyle = "#4950df";
    context.lineJoin = context.lineCap = "round";
    context.lineWidth = 5;

    for(var i=0; i < clickX.length; i++) {
        context.beginPath();
        if(clickDrag[i] && i){
            context.moveTo(clickX[i-1], clickY[i-1]);
        }else{
            context.moveTo(clickX[i]-1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.stroke();
    }
}*/