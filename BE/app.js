const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


var device = [0, 0, 0, 0, 0];

io.on('connection', (socket) => {
  var ID = device.indexOf(0);
  if (ID == -1) {
    socket.disconnect()
    return;
  }
  device[ID] = 1;
  socket.ID = ID;
  console.log('a user connected: ' + socket.ID);
  socket.on('disconnected', () => {
    console.log('a user disconnect: ' + socket.ID);
    device[socket.ID] = 0;
    // io.emit('disconnected', socket.ID); //thong bao cho tat ca cac may la co device  disconnect.
  });
  socket.emit('assignID', socket.ID); //gui cho may moi ket noi ID cua no
  socket.broadcast.emit('newConnection', socket.ID); //thong bao cho tat ca cac may la co device moi.
  socket.on('startVote', () => {
    console.log("startVote: " + socket.ID);
    console.log(device);
    let k = 0;
    for (k = socket.ID; k < 5; k++) {
      //neu cac may lon hon deu bi tat
      if (!device.slice(k).includes(1)) {
        k -= 1;
        break;
      }
      if (device[k] == 0) {
        continue;
      }

      for (let i = k + 1; i < 5; i++) {
        if (device[i] != 0) {
          // socket.emit("notifi", `Process `)
          console.log(`Process ${k} passes Election(${k}) message to process ${i}`)
        }
      }
      for (let i = k + 1; i < 5; i++) {
        if (device[i] != 0) {
          // console.log("notifi", `Process `)
          console.log(`Process ${i} passes OK(${i}) message to process ${k}`)
        }
      }
    }
    if (k == 5) {
      k -= 1;
    }
    console.log(`Finally process ${k} becomes Coodinator`);
    for (var i = k - 1; i >= 0; i--) {
      if (device[i] != 0)
        console.log(`Process ${k} passes Coodinator(${k}) messege to process ${i}`);
    }
  });
});



server.listen(3000, () => {
  console.log('listening on *:3000');
});