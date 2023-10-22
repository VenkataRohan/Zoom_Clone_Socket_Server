const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
 
const soc_perr=new Map();
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
      origin: "*",//["https://85df-2405-201-d048-a81e-9196-bd82-9feb-587c.ngrok-free.app","https://dcc2-2405-201-d048-a81e-9196-bd82-9feb-587c.ngrok-free.app","http://127.0.0.1:4040","http://localhost:3000","http://192.168.29.200:3000"],
      methods: ["GET", "POST"]
    }});
    const roomUserCounts = {};

app.get("/",(req,res)=>{
  res.send({"daSD":"ASDASD"})
})

io.on('connection', (socket) => {
  console.log('A user connected');
  console.log(socket.id);  

  //
  socket.on('join-room', (roomId, userId) => {
    console.log(userId);
    soc_perr.set(socket.id,userId)
    socket.join("1")
    // Increment the user count for the room
    // if (!roomUserCounts["1"]) {
    //     roomUserCounts["1"] = 1;
    //   } else {
    //     roomUserCounts["1"]++;
    //   }
   socket.to("1").emit('user-connected', userId)
   
    socket.on("recieveMsg",(val,soc_id)=>{
        console.log(val);
        console.log(soc_id);
        socket.to("1").emit("newMsg",val,soc_id)
    })

    socket.on("video_toggle",(usrid,soc_id,isvidoplaying)=>{
      console.log(usrid);
      console.log(soc_id);
      socket.to("1").emit("server_video_toggle",usrid,soc_id,isvidoplaying)
  })

      console.log(roomUserCounts["1"]);
    socket.on('disconnect', () => {
     console.log(soc_perr);
      socket.to("1").emit('user-disconnected', socket.id,soc_perr.get(socket.id))
      console.log('A user disconnected');
      soc_perr.delete(socket.id)
    })
  })
  //
 

  // socket.on('disconnect', () => {
  //   console.log('A user disconnected');
  // });
});
const port=process.env.PORT||8000
server.listen(port, () => {
  console.log('Server listening on '+ port);
});
