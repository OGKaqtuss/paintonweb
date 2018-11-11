const express = require('express');

const app = express();

const server = app.listen(3333, "127.0.0.1");

const io = require('socket.io').listen(server);

let rooms = 0;

//let connectedSockets = [];
//let rooms = [];

io.on('connection', function(socket){
    console.log("Player Connected");
    socket.on('gameEvent', function(dataObj) {
        let type = dataObj['type'];
        let data = dataObj['data'];

        switch(type){
            case 'createGame':
                socket.join('room-' + ++rooms);
                socket.emit('gameEvent', {
                    type: 'newGame',
                    data: {name: data.name, room: 'room-' + rooms}
                });

                console.log(rooms);

                break;
            case 'joinRoom':
                let room = io.nsps['/'].adapter.rooms[data.room];
                if( room && room.length == 1){
                    socket.join(data.room);
                    let word = getRandomWord();

                    io.to(data.room).emit('gameEvent', {type: 'gameReady', data: {time: new Date().getTime()+10000, word: "HGELLLO"}});

                    setTimeout(function(){
                        let time = getRandomTime()*1000;

                        let timeDate = new Date().setTime(new Date().getTime() + time);

                        io.to(data.room).emit('gameEvent', {type: 'gameStart', data: {time: timeDate}});
                        setTimeout(function(){
                            io.to(data.room).emit('gameEvent', {type: 'gameEnd'});
                        }, time);
                    }, 10000);
                    socket.emit('gameEvent', {type: 'roomJoin', data: {name: data.name, room: data.room }});
                }
                else {
                    socket.emit('err', {message: 'Sorry, The room is full!'});
                }
                /*if(connectedSockets[socket.id]){
                    removeFromRoom(socket.id);
                }
                let randStr = generateRandomRoom();
                for(let i in rooms){
                    if(rooms[i].length >= 2) {
                        if(i == rooms.length - 1){
                            rooms[randStr] = [];
                            rooms[randStr].push(socket.id);
                            connectedSockets.push(socket.id);
                        }
                    } else {
                        rooms[randStr].push(socket.id);
                        connectedSockets.push(socket.id);
                        break;
                    }
                }
                socket.join(randStr);*/
                break;
            case 'gameStart':

                break;
            case 'gameEnd':
                socket.broadcast.to(data.room).emit('gameEvent', {type: 'gameEndCanvas', data: {canvasData: data.canvasData}});
                break;
        }
    });

    socket.on('disconnect', function(data){
        //removeFromRoom(socket.id);
    })
});

function generateRandomRoom(){
    let str = "1234567890qwertyuiopasdfghjklzxcvbnm";

    let randStr = '';

    for(let i = 0; i < 8; i++){
        randStr += str[Math.random()*str.length];
    }

    return randStr;
}

function removeFromRoom(socketid){
    delete connectedSockets[socketid];
    for(let i = 0; i < rooms.length; i++){
        for(let a = 0; a < rooms[i].length; a++){
            if(rooms[i][a] == socketid) delete rooms[i][a];
        }
    }
}

function getRandomWord(){
    let words = ['hest', 'kartofle'];

    console.log(words[Math.random()*words.length-1]);

    return words[Math.random()*words.length-1];
}

function getRandomTime(){
    return Math.floor(Math.random()*10)+10;
}

console.log("Server Started");