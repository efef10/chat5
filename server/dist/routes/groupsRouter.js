"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var controllers = require("../controllers");
var groupsRouter = express.Router();
groupsRouter.get('/', controllers.getGroups);
groupsRouter.get('/:groupId/connectors', controllers.getConnectors);
groupsRouter.get('/:tree', controllers.getTree);
groupsRouter.get('/:groupId/messages', controllers.getGroupMessages);
groupsRouter.post('/:groupId', controllers.addGroup);
groupsRouter.post('/:groupId/connectors', controllers.addConnector);
groupsRouter.post('/:groupId/messages', controllers.addMessageToGroup);
groupsRouter.put('/:groupId', controllers.editGroup);
groupsRouter.delete('/:groupId', controllers.deleteGroup);
groupsRouter.delete('/:groupId/connectors/:childId', controllers.deleteConnector);
exports.default = groupsRouter;
//# sourceMappingURL=groupsRouter.js.map