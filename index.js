var express = require('express');
var socket = require('socket.io');

//App setup
var app = express();
var server = app.listen(4000, function(){
  console.log('server started');
});

//static files
app.use(express.static('public'));

//socket setup
var io = socket(server);

var rooms = [];

//varibles

//main socket queries function
io.on('connection', function(socket){

  //one field pressed
/*  socket.on('press', function(data){ //players online check
      if(xId=="" && socket.id != oId) {xId = socket.id;console.log("player x online")}
      else if(oId=="" && socket.id != xId){oId = socket.id;console.log("player o online")}
      //when x moved

      }
    });*/

  //joining to room
  socket.on('joinRoom', function(data){
    if (rooms.findIndex(function(element){return element.name == data.roomName}) == -1)
    {//if no such room exists
      rooms.push({name: data.roomName, numberOfPlayers: 1, readyPlayers: 0, players: [data.playerNick]});
      socket.join(data.roomName);
      io.in(data.roomName).emit('newPlayersList', rooms[rooms.findIndex(function(element){return element.name == data.roomName})].players);
    }
    else        //[rooms.findIndex(function(element){return element.name == data.roomName})] find room index
    {//if there is a player alredy
      socket.join(data.roomName);
      rooms[rooms.findIndex(function(element){return element.name == data.roomName})].numberOfPlayers ++;
      rooms[rooms.findIndex(function(element){return element.name == data.roomName})].players.push(data.playerNick);
      io.in(data.roomName).emit('newPlayersList', rooms[rooms.findIndex(function(element){return element.name == data.roomName})].players);
    }
  });

  //checked ready
  socket.on('ready', function(data){
    if(data.state)rooms[rooms.findIndex(function(element){return element.name == data.roomName})].readyPlayers++;
      else rooms[rooms.findIndex(function(element){return element.name == data.roomName})].readyPlayers--;

    if(rooms[rooms.findIndex(function(element){return element.name == data.roomName})].readyPlayers
        == rooms[rooms.findIndex(function(element){return element.name == data.roomName})].numberOfPlayers)

        io.in(data.roomName).emit('startGame');
  });

});
