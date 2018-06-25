import * as express from 'express';
import * as controllers from '../controllers'

const groupsRouter = express.Router();

groupsRouter.get('/',controllers.getGroups);
groupsRouter.get('/:groupId/connectors',controllers.getConnectors)
groupsRouter.get('/:tree',controllers.getTree)
groupsRouter.get('/:groupId/messages',controllers.getGroupMessages)

groupsRouter.post('/:groupId',controllers.addGroup);
groupsRouter.post('/:groupId/connectors',controllers.addConnector)
groupsRouter.post('/:groupId/messages',controllers.addMessageToGroup)

groupsRouter.put('/:groupId',controllers.editGroup);

groupsRouter.delete('/:groupId',controllers.deleteGroup);
groupsRouter.delete('/:groupId/connectors/:childId',controllers.deleteConnector);

export default groupsRouter;
