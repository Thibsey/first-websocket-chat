// Connection
var socket = io.connect('http://localhost:3000/');

// Query DOM

var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');


// Emit events

btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', (e) => {
    if (e.charCode === 13) {
        socket.emit('chat', {
            message: message.value,
            handle: handle.value
        });
    } else {
        socket.emit('typing', handle.value)
    }
});



// Listen for events

socket.on('chat', (data) => {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ':  </strong><i>' + data.message + '</i></p>'
})

socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...' + '</em></p>';
});

