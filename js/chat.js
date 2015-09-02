/**
 * Created by Branislav Vidojevic on 31/8/2015.
 */
var socket1 = new WebSocket('ws://localhost:8081/drawing-chat-board/chat');

socket1.onopen = function (e) {
    console.log('Veza sa chat serverom je uspesno uspostavljena.');
};

socket1.onclose = function (e) {
    console.log('Veza sa chat serverom je prekinuta: WebSocket Close event');
};

socket1.onerror = function (e) {
    console.log('Doslo je do greske: WebSocket Error event');
};

socket1.onmessage = function (e) {
    if (e.data.indexOf('image/png') == -1) {
        var node = document.createElement("P");
        var text = document.createTextNode(e.data);
        node.appendChild(text);
        document.getElementById("chatResponses").appendChild(node);
    }
};

$("#chatInput").keyup(function (e) {
    if (e.keyCode == 13) {
        var nickname = document.getElementById("name").value;
        if(nickname == "" || nickname == null) {
            alert('Unesi ime!');
            return;
        }
        var text = document.getElementById("chatInput").value;
        if (text == "" || text == " " || text == null){
            return;
        }
        socket1.send(nickname + " | " + text);
        document.getElementById("chatInput").value = "";
    }
});