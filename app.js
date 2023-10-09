const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
 
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
      origin: "*",//["https://85df-2405-201-d048-a81e-9196-bd82-9feb-587c.ngrok-free.app","https://dcc2-2405-201-d048-a81e-9196-bd82-9feb-587c.ngrok-free.app","http://127.0.0.1:4040","http://localhost:3000","http://192.168.29.200:3000"],
      methods: ["GET", "POST"]
    }});
    const roomUserCounts = {};
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('tst', (res)=>{
        console.log(res);
  })

  //
  socket.on('join-room', (roomId, userId) => {
    console.log(userId);
    socket.join("1")
    // Increment the user count for the room
    // if (!roomUserCounts["1"]) {
    //     roomUserCounts["1"] = 1;
    //   } else {
    //     roomUserCounts["1"]++;
    //   }
   socket.to("1").emit('user-connected', userId)

      console.log(roomUserCounts["1"]);
    socket.on('disconnect', () => {
      socket.to("1").emit('user-disconnected', userId)
    })
  })
  //
 

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(8000, () => {
  console.log('Server listening on http://localhost:8000');
});
