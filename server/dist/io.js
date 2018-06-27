"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socketIo = require("socket.io");
var socketApp = function (httpServer) {
    var io = socketIo(httpServer);
    io.on('connection', makeSocket);
    function makeSocket(socket) {
        console.log('a user connected');
        socket.on('message', function (msg, groupId) {
            console.log("a user sent message:", msg);
            socket.broadcast.to(groupId).emit('message', msg);
        });
        socket.on('join-group', function (groupId) {
            console.log("a user joined group:", groupId);
            socket.join(groupId);
        });
        socket.on('leave-group', function (groupId) {
            console.log("a user left group:", groupId);
            socket.leave(groupId);
        });
        socket.on('disconnect', function () {
            console.log('a user disconnected');
        });
    }
};
exports.default = socketApp;
//# sourceMappingURL=io.js.map