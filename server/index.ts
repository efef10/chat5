import * as http from 'http';
import app from './app';
import socketApp from './io'

const server = http.createServer(app);

socketApp(server)


server.listen(4000,()=>{
    console.log("listening on port 4000");
});