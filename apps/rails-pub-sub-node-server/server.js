//require the libraries
const http     = require('http');
const express  = require('express');
const socketIo = require('socket.io');
const redis    = require('redis');

//instantiate the app as an instance of express
const app      = express();

//allows express app to serve the public directory
app.use(express.static('lib'));

//ROUTES

//set the root view as the index.html
app.get('/', function (request, response){
  response.sendFile(__dirname + '/lib/chat.html');
});

//SERVER

//set the port if not evironmental port exists
var port = process.env.PORT || 3001;

//initialize the server - pass the express app to the http module and have it listen to the port
var server = http.createServer(app)
                 .listen(port, function(){
                    console.log('Listening on port '+ port +'.');
                  });

//initiate socket io using the server instance
const io       = socketIo(server);

//set the redis subscription to method from Rails app
var redisClient = redis.createClient();
redisClient.subscribe('new_message');
redisClient.subscribe('new_user');

//set a hash for names and colors
var nameColors = {'Guest': 'FF00CC'}

//set the io connection
io.on('connection', function(socket){

  //Give default name to socket on connect
  // socket.on('connect', function(){
  //   socket.name = "Guest";
  // });

  //setup event listener for userInfo from the client
  socket.on('message', function(channel, message){
    if(channel === 'userInfo'){
      socket.name = message;
    }
  });

  //setup event listener for when a socket disconnects
  socket.on('disconnect', function(){
    var name = "Guest";
    if(socket.name){ name = socket.name}
    io.sockets.emit('message', name+" has left the chat.");
  });

});

redisClient.on('message', function(channel, message){
  if(channel === 'new_user'){
    var parsed_message = JSON.parse(message) 
    io.sockets.emit('message', "<span style='color:"+parsed_message.color+"'>"+parsed_message.name+"</span> has entered the chat.");
  } else if(channel === 'new_message'){
    io.sockets.emit('message', message);
  }
});