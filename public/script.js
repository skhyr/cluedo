var socket = io.connect('http://192.168.0.15:4000');
var myRoomName;
var myNick;
var gameElements = document.getElementById("game");
var roomChoiceElements = document.getElementById("roomChoice");
var waitForReadyElements = document.getElementById("waitForReady");
var room = document.getElementById('roomName');
var checkbox = document.getElementById("checkbox");
var btn = document.getElementById('btn');
var nick= document.getElementById('nick');
var list = document.getElementById("list");
var playersList;
//emit events
btn.addEventListener('click', function(){
  myRoomName = room.value;
  myNick = nick.vale;
  socket.emit('joinRoom', {
    roomName: room.value,
    playerNick: nick.value
  });
});
checkbox.addEventListener('click', function(){
  socket.emit('ready', {state: checkbox.checked, roomName: myRoomName})
});

socket.on('newPlayersList', function(data){
  list.innerHTML = data;
  roomChoiceElements.style.display = "none";
  waitForReadyElements.style.display = "block";
});

socket.on('startGame', function(){
  gameElements.style.display = "block";
  waitForReadyElements.style.display = "none";
});
