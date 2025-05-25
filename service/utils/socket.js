const { Server } = require("socket.io");

let io;

const setupSocket = (server) =>{
    io = new Server (server,{
        cors:{
            origin: "*",
            methods :["GET","POST"],
        },
    });
    io.on("connection", (socket)=>{
        console.log(`User connected: ${socket.id}`);
        socket.on("joinRoom", (room)=>{
            socket.join(room);
            console.log(`User ${socket.id} joined room: ${room}`);
        });
    socket.on("sendMessage",(data)=>{
         io.to(data.room).emit("receiveMessage", data);
        });
    socket.on("disconnect", ()=>{
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};

const getIO = () => {
    if(!io){
        throw new error ("Socket.io has not been initialized!");
    }
    return io;
};

module.exports = {setupSocket, getIO};