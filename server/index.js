const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const app = express();
const cors = require("cors");
const path = require('path');
const dotenv = require("dotenv");
dotenv.config();

const router = require("./router");

const {addUser, removeUser, getUser, getUserInRoom} = require('./User');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketio(server);


app.use(cors());

const __dirname1 =path.resolve();

console.log(__dirname1);
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname1, '/client/dist')));
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(path.join(__dirname1,'/client', 'dist', 'index.html')));
    });
} else{
    app.use(router);
    console.log(process.env.NODE_ENV);
}

io.on('connect', (socket) => {

    socket.on('join',({name,room} , callback) =>{
        console.log(name,room);
        const {error, user} =  addUser({id: socket.id,name:name,room:room});
        if(error){
            return callback({error});
        }

        socket.emit('message' , 
        {user: 'admin', text:`${user.name}, welcome to the room : ${user.room}`})

        socket.broadcast.to(user.room).emit('message',
        {user: 'admin', text: `${user.name} has joined!`});

        socket.join(user.room);

        io.to(user.room).emit('roomData',{room: user.room, users:getUserInRoom(user.room)});

        callback();

    });
    socket.on('sendMessage', (message,callback)=>{
        const user = getUser(socket.id);
        io.to(user.room).emit('message' , {user:user.name, text: message});
        io.to(user.room).emit('roomData' , {room:user.room, users:getUserInRoom(user.room)});
        callback();
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected');
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message' , {user: 'admin', text: `${user.name} has left.`});
        }
    })
});



server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});