require('./socketio');
require('./jquery');

var canvas = $("#game");
var ctx = canvas[0].getContext("2d");

var canPaint = false;
var lineWidth = ctx.lineWidth = 4;
var lineJoin = ctx.lineJoin = "round";
var fillStyle = ctx.fillStyle = "#000";
var gameContainer = $("#gameContainer");

var host = io('127.0.0.1:3333');
var room;

$(".start-button").on('click', function(e){
    $("#lobbyContainer").css('display', 'none');
    gameContainer.css('display', 'block');
});

$("#join").on('click', function(e){
    sendGameEvent('joinRoom', {room: 'room-1'});
});

$("#create").on('click', function(e){
    sendGameEvent('createGame');
});

var mouseposPrevX;
var mouseposPrevY;
var mouseposX;
var mouseposY;
var paint = false;
var drawingReset = false;

$(document).on('mousemove', function(e){
    if(!canPaint) return;
    draw(e.clientX, e.clientY);
})
$(document).on('mouseup', function(){
    if(!canPaint) return;
    resetDrawing();
})
canvas.on('mousedown', function(e){
    if(!canPaint) return;

    paint = true;

    mouseposX = e.pageX - this.offsetLeft;
    mouseposY = e.pageY - this.offsetTop;

    drawPixel(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
})

function drawPixel(){
    ctx.beginPath();
    ctx.moveTo(mouseposX, mouseposY);
    ctx.lineTo(mouseposX+1, mouseposY+1);
    ctx.closePath();
    ctx.stroke();
}

function draw(clientX, clientY){
    if(!paint) return;
    updateMousePosition(clientX,clientY);
    var test = createDrawCommandLine(1, 11, mouseposPrevX, mouseposPrevY, mouseposX, mouseposY);
    performDrawCommand(test);
}

function updateMousePosition(clientX, clientY) {
    var bound = canvas[0].getBoundingClientRect();
    var width = canvas[0].width;
    var height = canvas[0].height;
    var bWidth =  bound.width;
    var bHeight = bound.height;
    var pageX = (clientX - bound.left) / bWidth;
    var pageY = (clientY - bound.top) / bHeight;

    if(!drawingReset) {
        mouseposPrevX = mouseposX;
        mouseposPrevY = mouseposY;
        mouseposX = Math.floor(pageX * width);
        mouseposY = Math.floor(pageY * height);
    } else {
        mouseposPrevX = mouseposX = Math.floor(pageX * width);
        mouseposPrevY = mouseposY = Math.floor(pageY * height);
        drawingReset = false;
    }
}

function createDrawCommandLine(color, thick, prevX, prevY, x, y){
    return [0, color, thick, prevX, prevY, x, y];
}

function performDrawCommand(options) {
    switch (options[0]) {
        case 0:
            var thickness = Math.floor(options[2]);
            var halfThickness = Math.floor(Math.ceil(thickness / 2));
            var prevX = createCoordinate(Math.floor(options[3]), -halfThickness, canvas[0].width + halfThickness);
            var prevY = createCoordinate(Math.floor(options[4]), -halfThickness, canvas[0].height + halfThickness);
            var xCord = createCoordinate(Math.floor(options[5]), -halfThickness, canvas[0].width + halfThickness);
            var yCord = createCoordinate(Math.floor(options[6]), -halfThickness, canvas[0].height + halfThickness);
            plotLine(prevX, prevY, xCord, yCord, thickness);
            break;
    }
}

function plotLine(prevX, prevY, xCord, yCord, thickness){
    ctx.lineWidth = thickness;
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(xCord, yCord);
    ctx.closePath();
    ctx.stroke();
}

function createCoordinate(cord, negativeThickness, canvasSize){
    if(cord < negativeThickness) {
        return negativeThickness;
    }
    else {
        if (cord > canvasSize) {
            return canvasSize;
        }else {
            return cord;
        }
    }
}

function resetDrawing(){
    mouseposPrevX = null;
    mouseposPrevY = null;
    mouseposX = null;
    mouseposY = null;
    paint = false;
    drawingReset = true;
}

function sendGameEvent(type, data) {
    if(!data) data = [];
    host.emit('gameEvent', {
        'type': type,
        'data': data
    });
}

function gameReady(data){

    var dateTime = data.time;
    var word = data.word;

    console.log(gameContainer.find("#gameReady"));

    var gameReady = gameContainer.find("#gameReady");


    gameReady.find('.word').text(word);
    gameReady.css('display', 'block');
    var timer = setInterval(function(){
        var dateDiff = dateTime - new Date().getTime();
        console.log(dateDiff);
        gameReady.find('.counter').text(Math.ceil(dateDiff/1000).toFixed(0));
        if(dateDiff <= 0){
            clearInterval(timer);
            gameContainer.find("#gameReady").css('display', 'none');
        }
    }, 500);

}

host.on('gameEvent', function(msg){
    console.log(msg);
    var data = msg.data;

    switch(msg.type) {
        case 'newGame':
            room = data.room;
            break;
        case 'roomJoin':
            room = data.room;
            break;
        case 'gameReady':
            gameReady(data);
            break;
        case 'gameStart':
            canPaint = true;
            console.log("GAME STARTED!");
            break;
        case 'gameEnd':
            sendGameEvent('gameEnd', {room: room, canvasData: canvas[0].toDataURL()});
            canPaint = false;
            break;
        case 'gameEndCanvas':
            gameContainer.prepend("<img width='600px' height='600px' src='"+data.canvasData+"'>");
            //console.log(data.canvasData);
            break;
    }
});

/*var halfthickness = Math.floor(thickness / 2);
    var doubleThickness = halfthickness * halfthickness;

    var minX = Math.min(prevX, xCord) - halfthickness;
    var minY = Math.min(prevY, yCord) - halfthickness;
    var maxX = Math.min(prevX, xCord) + halfthickness;
    var maxY = Math.min(prevY, yCord) + halfthickness;

    prevX -= minX;
    prevY -= minY;
    xCord -= maxX;
    yCord -= maxY;

    var canvasData = ctx.getImageData(minX, minY, maxX - minX, maxY - minY);
    function setCanvasData(xData, yData) {
        for (var x = -halfthickness; x <= halfthickness; x++) {
            for (var y = -halfthickness; y <= halfthickness; y++) {
                if(x * x + y * y < doubleThickness) {
                    // Index of the pixel in the array
                    var index = 4 * ((yData + y) * canvasData.width + xData + x);

                    if(index >= 0 && index < canvasData.data.length) {
                        canvasData.data[index] = 51;
                        canvasData.data[index + 1] = 51;
                        canvasData.data[index + 2] = 51;
                        canvasData.data[index + 3] = 255;
                    }
                }
            }
        }
    }

    if(xCord == prevX && prevY == yCord)
        setCanvasData(prevX, prevY);
    else {
        ctx.fillStyle = "#000";
        ctx.lineWidth = thickness;
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(xCord, yCord);
        ctx.closePath();
        ctx.stroke();
    }
    ctx.putImageData(canvasData, minX, minY);*/
//return t < e ? e : t > n ? n : t;