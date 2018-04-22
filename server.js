var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use("/public", express.static(__dirname + "/public"));

app.get('/', function(req, res)
{
  res.sendFile(__dirname + '/index.html');
});

app.get('/manage', function(req, res)
{
  res.sendFile(__dirname + '/manage.html');
});

io.on('connection', function(socket)
{
  socket.on('manage message', function(msg)
  {
    io.emit('chat message', msg);
  });
});

http.listen(3000, function()
{
  console.log('Listening on port 3000');
});
