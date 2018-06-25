import * as http from 'http';
import app from './app';
// import * as socketIo from 'socket.io';
// var http = require('http').Server(app);
const server = http.createServer(app);

import socketApp from './io'

socketApp(server)



// const io = socketIo(server);
// const socket = io();
// var io = require('socket.io')(http);

// io.on('connection',(socket)=>{
//     console.log("someone opened the browser...")
//
//     socket.emit('user logged in',(user:any)=>{
//         io.emit('user logged in',user,{ for: 'everyone' });
//         console.log(`user ${user} has logged in`);
//     });
//
//     socket.on('disconnect',()=>{
//         console.log("a user disconnected");
//     });
//
// })

server.listen(4000,()=>{
    console.log("listening on port 4000");
});