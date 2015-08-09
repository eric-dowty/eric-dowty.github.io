//initiate socket using const io from server
var socket = io();

//get DOM elements
var messages      = document.getElementById('message-view');
var messageButton = document.getElementById('new-message-submit');
var nameButton    = document.getElementById('name-submit');
var userName      = 'Guest';
var userColor     = 'FF00CC';
var loginDiv      = document.getElementById('login-div');
var chatDiv       = document.getElementById('chat-div');

function setLoginView(){
  chatDiv.style.display  = 'none';
  loginDiv.style.display = 'block';
};

function setChatView(){
  loginDiv.style.display = 'none';
  chatDiv.style.display  = 'block';
};

function enterChat(){
  nameButton.addEventListener('click', function(){
    userName = document.getElementById('enter-name').value;
    if(userName === "" || userName.length > 15){ 
      userName = "Guest"
      addMessage("A <span style='color:FF00CC'>Guest</span> has entered the chat.")
    } else {
      userAJAX(userName);
    };
    socket.send('userInfo', userName)
    setChatView(); 
  });
};

function addMessage(message){
  var newMessage = document.createElement("li");
  messages.appendChild(newMessage);
  newMessage.innerHTML = message;
};

function sendMessage(){
  messageButton.addEventListener('click', function(){
    var message = document.getElementById('message').value;
    messageAJAX(message);
  });
};

function userAJAX(name){
  $.ajax({
    url: "http://localhost:3000/users",
    data: { 
        "user": { "name": name }
    },
    type: "POST"
  });
};

function messageAJAX(message){
  $.ajax({
    url: "http://localhost:3000/messages",
    data: { 
        "message": { "user_name": userName, "body": message }
    },
    type: "POST"
  });
};

socket.on('message', function(message){
  addMessage(message);
});

sendMessage();
enterChat();
setLoginView();