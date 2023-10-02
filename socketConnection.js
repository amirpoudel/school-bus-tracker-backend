
const { handleLiveBusLocation } = require("./controllers/liveLocation/controller.liveBusLocation");


const app = require("express")();

const server = require('http').createServer(app);

const io = require("socket.io")(server,{
    pingTimeOut: 60000,
    cors: {
      origin: "http://localhost:3000",
    },
})



const sockerServer = {};


sockerServer.liveLocation = function (){

    let busLocation = io.of("/busLocation/");


    busLocation.on("connection",async function(socket){
        console.log("COnnection is HERE !!!!!")
        handleLiveBusLocation(busLocation,socket)
    })

}


sockerServer.startServer = ()=>{
    server.listen(5000,()=>{
        console.log('Socket server running on port 5000');
    })
}

module.exports = sockerServer;


