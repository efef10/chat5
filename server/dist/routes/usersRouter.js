"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var controllers = require("../controllers");
var usersRouter = express.Router();
usersRouter.get('/', controllers.getUsers);
usersRouter.get('/:userName/messages/:chattingWith', controllers.getUserMessages);
usersRouter.post('/', controllers.addUser);
usersRouter.post('/:userName/messages', controllers.addMessageToUser);
usersRouter.put('/:userId', controllers.editUser);
usersRouter.delete('/:userId', controllers.deleteUser);
// usersRouter.post('/',async (req,res)=>{
//     let user = await usersDB.addUser(req.body);
//     res.json(user);
//     // res.set('location', 'https://localhost:4000/users');
//     // res.status(301).send()
//     // res.redirect("users"); + req.path
// });
exports.default = usersRouter;
//# sourceMappingURL=usersRouter.js.map