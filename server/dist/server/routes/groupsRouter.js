"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var controllers = require("../controllers");
var groupsRouter = express.Router();
groupsRouter.get('/', controllers.getGroups);
groupsRouter.get('/:groupId/connectors', controllers.getConnectors);
groupsRouter.post('/:groupId', controllers.addGroup);
groupsRouter.put('/:groupId', controllers.editGroup);
groupsRouter.delete('/:groupId', controllers.deleteGroup);
groupsRouter.delete('/:groupId/connectors/:childId', controllers.deleteConnector);
// groupsRouter.get('/get',async (req,res)=>{
//     let groups = await controllers.getGroups()
//     res.json(groups);
// })
exports.default = groupsRouter;
//# sourceMappingURL=groupsRouter.js.map