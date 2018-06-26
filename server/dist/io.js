"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socketIo = require("socket.io");
var socketApp = function (httpServer) {
    var io = socketIo(httpServer);
    io.on('connection', makeSocket);
    function makeSocket(socket) {
        console.log("hi");
        socket.on('message', function (msg) {
            io.emit('message', msg, { for: 'everyone' });
        });
    }
};
exports.default = socketApp;
//# sourceMappingURL=io.js.map