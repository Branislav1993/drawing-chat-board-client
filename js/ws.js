/**
 * Created by Branislav Vidojevic on 30/8/2015.
 */
var socket = new WebSocket('ws://localhost:8081/drawing-chat-board/websocket');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var isDrawing;
var image = new Image();

var offset = $('#canvas').offset();

socket.onopen = function () {
    console.log('Uspesno uspostavljena veza sa serverom');
};

socket.onmessage = function (m) {
    image.onload = function () {
        ctx.drawImage(image, 0, 0);
    };
    image.src = m.data;
};

canvas.onmousedown = function (e) {
    isDrawing = true;
    ctx.moveTo(e.clientX - offset.left, e.clientY - offset.top);
};

canvas.onmousemove = function (e) {
    if (isDrawing) {
        ctx.lineTo(e.clientX - offset.left, e.clientY - offset.top);
        ctx.stroke();
    }
};
canvas.onmouseup = function () {
    isDrawing = false;
    socket.send(canvas.toDataURL('image/png'));
};

canvas.onclose = function () {
    console.log('Konekcija je prekinuta.');
}