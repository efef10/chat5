import * as express from 'express';
import * as controllers from '../controllers'

const groupsRouter = express.Router();

groupsRouter.get('/',controllers.getGroups);
groupsRouter.get('/:groupId/connectors',controllers.getConnectors)
groupsRouter.get('/:tree',controllers.getTree)

groupsRouter.post('/:groupId',controllers.addGroup);
groupsRouter.post('/:groupId/connectors',controllers.addConnector)


groupsRouter.put('/:groupId',controllers.editGroup);

groupsRouter.delete('/:groupId',controllers.deleteGroup);
groupsRouter.delete('/:groupId/connectors/:childId',controllers.deleteConnector);
// groupsRouter.get('/get',async (req,res)=>{
//     let groups = await controllers.getGroups()
//     res.json(groups);
// })

export default groupsRouter;
