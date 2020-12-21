const socketio = require('socket.io');
const { addUser, getOnlineUsers, removeUser } = require('../sockets/utils/usersConnected');


const socket = (server) =>{
    const io = socketio(server,{
        cors: {
          origin: process.env.CLIENT_URL,
          methods: ["GET", "POST"],
          allowedHeaders: ["username"],
          credentials: true
        }
      })
    io.on('connection',(socket)=>{
        console.log('new web socket connection')
        addUser(socket.id,socket.handshake.headers.username)
        io.emit('online-user',getOnlineUsers())
        // socket.join(socket.id)

        socket.on('send-message',(socketId,{content, type, name})=>{
          // socket.join(socketId)
          // socket.broadcast.to(socketId).emit('rescive-messages',
          // {id: socket.id, message})
          socket.to(socketId).emit('rescive-messages',{socketId: socket.id,type ,content, name})
        })
    
        socket.on('disconnect',()=>{
          removeUser(socket.id)
          console.log(socket.handshake.headers.username+' disconnected')
          io.emit('online-user',getOnlineUsers())
        })

      })

    
}

module.exports = socket;


