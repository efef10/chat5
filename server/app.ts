import * as express from 'express';
import * as routes from './routes';

const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/users',routes.usersRouter);
app.use('/groups',routes.groupsRouter);

// app.listen(4000,()=>{
//     console.log("listening on port 4000");
// })

export default app;