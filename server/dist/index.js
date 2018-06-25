"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var app_1 = require("./app");
// import * as socketIo from 'socket.io';
// var http = require('http').Server(app);
var server = http.createServer(app_1.default);
var io_1 = require("./io");
io_1.default(server);
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
server.listen(4000, function () {
    console.log("listening on port 4000");
});
//# sourceMappingURL=index.js.map