const express = require('express');
const app = express();


//config socket
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: { origin: '*' }
});


var device = [0, 0, 0, 0, 0];
var log = [];
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
  });
  socket.emit('assignID', socket.ID); //gui cho may moi ket noi ID cua no
  socket.on('startVote', () => {
    io.emit('notifiCodinator', `START: Máy ${socket.ID} tổ chức bầu cử!`)
    console.log(`START: Máy ${socket.ID} tổ chức bầu cử!`);
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
          log.push(`Máy ${k} gửi thông điệp Election(${k}) cho máy ${i}`)
        }
      }
      for (let i = k + 1; i < 5; i++) {
        if (device[i] != 0) {
          log.push(`Máy ${i} gửi thông điệp OK(${i}) cho máy ${k}`)
        }
      }
    }
    if (k == 5) {
      k -= 1;
    }
    log.push(`FINALLY: Máy điều khiển hiện tại: ${k}`);
    for (var i = k - 1; i >= 0; i--) {
      if (device[i] != 0) {
        log.push(`Máy ${k} gửi thông điệp Victory Coodinator(${k}) cho máy ${i}`)
      }
    }
    log.forEach((e, i) => {
      setTimeout(() => {
        console.log(e);
        io.emit('notifiCodinator', e)
      }, i * 100)
    });
  });
});
const path = require('path');

const publicPath = path.join(__dirname, "./public/");

app.use(express.static(publicPath));
const cors = require("cors");
app.use(cors({
  origin: '*',
}));



// listend on port 3000
server.listen(3000, () => {
  console.log('listening on *:3000');
});