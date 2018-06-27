"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var app_1 = require("./app");
var io_1 = require("./io");
var server = http.createServer(app_1.default);
io_1.default(server);
server.listen(4000, function () {
    console.log("listening on port 4000");
});
//# sourceMappingURL=index.js.map