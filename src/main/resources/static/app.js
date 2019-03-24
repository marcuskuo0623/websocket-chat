var stompClient = null;

function setConnected() {
    $(".chat-name-block enter").hide();
}

function connect() {
    var socket = new SockJS('/websocket-socket-js');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        stompClient.subscribe('/topic/greetings', function (greeting) {
            var user = JSON.parse(greeting.body);
            showGreeting(user.name, user.content);
        });
    });
}

function sendUserMessage() {
    stompClient.send("/app/hello",
        {"content-type": "application/json"},
        JSON.stringify({'name': $("#name").val(), 'content': $("#content").val()}));

    $("#content").val("");
}

function showGreeting(name, message) {
    $("#greetings").append("<tr><td>" + name +":"  + "</td><td>" + message + "</td></tr>");
}


$(document).ready(function () {
    connect();
    $("#btnName").click(function () {
        $(".chat-name-block .no-enter").hide();
        $(".chat-name-block .enter").show();
        $("#enterUserName").append($("#name").val() + " 你好！");
        $("#btnMessage").attr("disabled", false).show();
    });
    $("#btnMessage").click(function () {
        sendUserMessage();
    });
});
