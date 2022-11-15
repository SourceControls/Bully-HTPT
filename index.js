

const { response } = require('express')
const express = require('express')
const app = express()
const port = 3000

let request = require('request');
function doRequest(url, data = {}) {
  return new Promise((resolve, reject) => {
    request.post(url, { json: data },
      function (error, res, body) {
        if (!error & res.statusCode == 200) {
          resolve(body)
        } else {
          reject(error);
        }
      }
    )
  });
}


const listID = ['169.254.125.161', '169.254.197.194', '169.254.137.56']
var condinator = 5;
const thisIDindex = 2;
app.use('/bauChon', async (req, res) => {
  http://localhost:3000/bauChon?data=0
  var reqIDIndex = req.query.data;
  if (reqIDIndex < thisIDindex) {
    res.send("1");
  }
  if (this.ID == bigestID) {
    listID.forEach(id => {
      doRequest(`http://${id}:3000/setCondinator?data=${thisIDindex}`);
    })
  }
  //   if (reqID < this.ID) {
  //     res.send("I am bigger than you");
  //     if (this.ID == bigestID) {
  //       alertToAll('Condinator:' + this.ID)
  //       return;
  //     }

  //     sendRequestToBiggerID(); // timeout = 300;
  //     if (timeout > 300 && no Response from any bigger ID){
  //   alertToAll('Condinator:' + this.ID)
  // }
  //   }
})

app.use('/setCondinator', function (req, res) {
  condinator = req.query.data;
  //
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
