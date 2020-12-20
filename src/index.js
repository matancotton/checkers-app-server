const express = require('express')
const cors = require('cors');
const router = require('./routers/userRouter');
const http = require('http')
const socket = require('./sockets/socket')
const port = process.env.PORT;
require('./db/mongoose')


const app = express()
const server = http.createServer(app)


app.use(cors())
app.use(express.json())
app.use(router)


socket(server)


server.listen(port, ()=>{
    console.log("Server is up on port ",port)
})



