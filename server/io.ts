import { Server } from 'http'
import * as socketIo from 'socket.io'


const socketApp = (httpServer: Server) => {
    const io = socketIo(httpServer)

    io.on('connection', makeSocket)

    function makeSocket(socket: socketIo.Socket) {
        console.log("hi");
        socket.on('message', (msg)=>{
            io.emit('message',msg, { for: 'everyone' })
        })
    }


}

export default socketApp