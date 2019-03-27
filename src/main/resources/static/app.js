var stompClient = null;

function connect() {
  const socket = new SockJS('/websocket-socket-js');
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    stompClient.subscribe('/topic/user/allMessage', function (greeting) {
      const user = JSON.parse(greeting.body);
      showGreeting(user.name, user.content);
    });
  });
}

function sendUserMessage() {
  const talkName = $("#talkName").val();
  if (talkName === null || talkName.length === 0) {
    stompClient.send("/app/chat",
      {"content-type": "application/json"},
      JSON.stringify({'name': $("#name").val(), 'content': $("#content").val()}));

  } else {
    stompClient.send("/app/chat/" + talkName,
      {"content-type": "application/json"},
      JSON.stringify({'name': $("#name").val(), 'content': $("#content").val()}));
  }
  $("#content").val("");
}

function showGreeting(name, message) {
  $("#greetings").append("<tr><td>" + name + ":" + "</td><td>" + message + "</td></tr>");
}


$(document).ready(function () {
  connect();
  $("#btnName").click(function () {
    if ($("#name").val().length === 0) {
      alert("請輸入名字！");
      return false;
    }
    $(".chat-name-block .no-enter").hide();
    $(".chat-name-block .enter").show();
    $("#enterUserName").append($("#name").val() + " 你好！");
    $("#btnMessage").attr("disabled", false).show();

    if (stompClient != null) {
      stompClient.subscribe('/topic/user/' + $("#name").val(), function (greeting) {
        const user = JSON.parse(greeting.body);
        showGreeting(user.name, user.content);
      });
    }

  });
  $("#btnMessage").click(function () {
    sendUserMessage();
  });
});
