var path = require('path');
var fs = require('fs');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ss = require('socket.io-stream');

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var tick = 0, score = 0;

io.on('connection', function (socket) {
    console.log("hi");
    ss(socket).on('voice', function (incomingStream, data) {
        console.log("stream", data);
        //var filename = path.basename("data.txt");
        //var writeStream = fs.createWriteStream("./data.txt");

        //// This catches any errors that happen while creating the readable stream (usually invalid names)
        //writeStream.on('error', function (err) {
        //    console.log("StreamError", err);
        //});

        incomingStream.on('data', (chunk) => {
            console.log(`Received ${chunk.length} bytes of data.`);
        });

        var outgoingStream = ss.createStream();
        ss(socket).emit('voice', outgoingStream, data);
        incomingStream.pipe(outgoingStream);

    });
});

//io.on('connection', function (client) {
//    console.log('Binary Server connection started');

//    client.on('stream', function (stream, meta) {
//        console.log('>>>Incoming audio stream');

//        //// broadcast to all other clients
//        //for (var id in binaryserver.clients) {
//        //    if (binaryserver.clients.hasOwnProperty(id)) {
//        //        var otherClient = binaryserver.clients[id];
//        //        if (otherClient != client) {
//        //            var send = otherClient.createStream(meta);
//        //            stream.pipe(send);
//        //        } // if (otherClient...
//        //    } // if (binaryserver...
//        //} // for (var id in ...

//        stream.on('end', function () {
//            console.log('||| Audio stream ended');
//        });

//    }); //client.on
//}); //binaryserver.on

//io.on('connection', function (socket) {
//    console.log('a user connected');
//    socket.on('disconnect', function () {
//        console.log('user disconnected');
//    });
//});

http.listen(3000, function () {
    console.log('listening on *:3000');
});