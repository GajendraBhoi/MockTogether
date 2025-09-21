require('dotenv').config();
const { Socket } = require("dgram");
const express = require("express");
const app = express();
const http = require('http'); // for http request
const {Server} = require('socket.io');

const cors = require('cors');
const cookieParser = require('cookie-parser');

// 1. Global Middleware
app.use(express.json());            // parse JSON bodies
app.use(cookieParser());            // parse cookies

const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));         //  enable CORS (handles preflight too)

// 2. Database Connection
const dbConnect = require('./Config/database');
dbConnect();

// 3. Routes
const userRoute = require('./Routes/User');
app.use('/', userRoute) ;


const server = http.createServer(app);
const io = new Server(server);  

const userSocketMap = {
    // map to store {socket ID , userName}   
};

const getAllConnectedClients = (roomId) => {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                userName : userSocketMap[socketId],
            }
        }
    ); // getting the room it is of map type so we have typecasted it to array type
}



io.on('connection',(socket)=>{
    console.log("user connected : ",socket.id);

    socket.on('join',({userName,roomId}) => {
        userSocketMap[socket.id] = userName;
        socket.join(roomId); // new room will be created if not exist else joined to existing room
        
        // alerting all already connected client 
        const clients = getAllConnectedClients(roomId);
        // console.log('clients',clients)
        clients.forEach(({socketId}) => { // notifying all users
            io.to(socketId).emit('joined',{
                clients,
                userName,
                socketId:socket.id,
            })
        })
    });

    socket.on('code-change',({roomId,code}) => {
        socket.in(roomId).emit("code-change",{code}); // everyone except self
    });

    socket.on("sync-code",({socketId,code}) => { // sync the code for newly joined users 
        io.to(socketId).emit("code-change",{code});
    });

    socket.on('disconnecting',() => {
        const rooms =  [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.to(roomId).emit('disconnected',{
                socketId:socket.id,
                userName: userSocketMap[socket.id],
                
            })
        })
        delete userSocketMap[socket.id];
        // socket.leave();
    })
})



const PORT = process.env.PORT || 5000;
server.listen(PORT,()=>{
    console.log("server is listening at PORT : ",PORT);
})