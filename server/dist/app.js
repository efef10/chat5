"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var routes = require("./routes");
var cors = require('cors');
var app = express();
app.use(cors());
app.use(express.json());
app.use('/users', routes.usersRouter);
app.use('/groups', routes.groupsRouter);
// app.listen(4000,()=>{
//     console.log("listening on port 4000");
// })
exports.default = app;
//# sourceMappingURL=app.js.map