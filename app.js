const http = require('http');
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const ejs = require("ejs");
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: { origin: "*" }
})
// Set EJS as the view engine
app.set('view engine', "ejs");

app.get('/', (req, res) => {
    res.render('index');
});


io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        io.emit('message', msg);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    console.log('listening on *:3000');
});