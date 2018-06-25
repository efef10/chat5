import { Server } from 'http'
import * as socketIo from 'socket.io'


const socketApp = (httpServer: Server) => {
    const io = socketIo(httpServer)

    io.on('connection', makeSocket)

    function makeSocket(socket: socketIo.Socket) {
        console.log("hi");
        socket.on('message', onMessage)
    }

    async function onMessage(message:any) {
        console.log(message)
        io.emit('message')
    }
}

export default socketApp