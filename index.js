var express = require('express');
var socket = require('socket.io')

var app = express();

// Static files
app.use(express.static('public'));





// Server
var server = app.listen(3000, () => {
    console.log('listening to requests on port 3000');
});

// Socket setup
var io = socket(server);

io.on('connection', (socket) => {
    console.log('made socket connection', socket.id);

    socket.on('chat', (data) =>{
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });

});