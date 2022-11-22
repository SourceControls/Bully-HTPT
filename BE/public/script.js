import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';
const socket = io('http://localhost:3000/');

socket.on('connection', () => {
  console.log('connected');
});
socket.on('assignID', (ID) => {
  document.title = ID;
  thisID = ID;
});
socket.on('disconnected', (ID) => {
  console.log("ID disconnected: " + ID);
});
socket.on('newConnection', (ID) => {
  console.log("newConnection: " + ID);
});
socket.emit("notifi", (noti) => {
  console.log(noti);
})
var thisID;  //0,1,2,3,4
var device = [1, 1, 1, 1, 0]
setTimeout(() => { //init disconnect device
  if (device[thisID] == 0) {
    socket.emit("disconnected");
  }
}, "5000")
setTimeout(() => {
  if (thisID == 0)  //start vote
  {
    socket.emit("startVote");
  }
}, "15000")