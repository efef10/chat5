import { Server } from 'http'
import * as socketIo from 'socket.io'


const socketApp = (httpServer: Server) => {
    const io = socketIo(httpServer)

    io.on('connection', makeSocket)

    function makeSocket(socket: socketIo.Socket) {
        console.log('a user connected');

        socket.on('message', (msg:any,groupId:string)=>{
            console.log("a user sent message:",msg);
            socket.broadcast.to(groupId).emit('message',msg);
        })

        socket.on('join-group', (groupId)=>{
            console.log("a user joined group:",groupId);
            socket.join(groupId)
        })

        socket.on('leave-group', (groupId)=>{
            console.log("a user left group:",groupId);
            socket.leave(groupId)
        })

        socket.on('disconnect', ()=>{
            console.log('a user disconnected');
        })
    }


}

export default socketApp