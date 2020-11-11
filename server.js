const path = require('path');
const http =require('http')
const express = require('express');
const socketio =require('socket.io');
const app = express();
const formatMessage = require('./util/messages');
const {userJoin, users, getUser, userLeave} = require('./util/users')

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket=>{
    socket.on('users', ({username}) =>{

        const user = userJoin(socket.id, username);
        const newUser = getUser(socket.id)
        socket.emit("message", formatMessage("Node.js" , "Welcome to chat cord"));

        socket.broadcast.emit("message", formatMessage("Node.js", `${newUser.username} has joined the chat`));    

        io.emit('allUsers' ,{
            users: users
        })
    })

    socket.on("disconnect", ()=>{
        const user = userLeave(socket.id);
        if (user)
        {
        io.emit("message", formatMessage("Node.js", `${user.username} has left the chat`))
        }
    });

    socket.on("chatMessage" ,(message)=>{
        const user =getUser(socket.id)
        io.emit("message", formatMessage(user.username, message))
    })
})


app.use(express.static(path.join(__dirname,'public')));

server.listen(3000, ()=> "Your port is running at 3000");