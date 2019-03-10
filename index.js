var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var jf = require('jsonfile'); //jsonfile module
var fs = require('fs'); //require file system

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
res.sendFile(__dirname + '/index.html');
});



io.sockets.on('connection', function(socket) {

  jf.readFile("./static/sports.jsp", 'utf-8' ,function(err, data){
    var data = data;
    socket.emit('sendData', data);
  });

  fs.watch("./static/sports.jsp", function(event, fileName) { //watching my        sports.json file for any changes
    //NOTE: fs.watch returns event twice on detecting change due to reason that editors fire 2 events --- there are workarounds for this on stackoverflow
    jf.readFile('./static/sports.jsp', function(err, data) { //if change detected read the sports.json 
        var data = data; //store in a var
        socket.emit('sendData', data);
    });
  });  

});

http.listen(3000, function() { //listen to 3000
console.log('listening on *:3000');
});