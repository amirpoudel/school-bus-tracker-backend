const { getCurrentLocationRef } = require("../../models/firebase/model.firebase");
const { makeNodeRelation } = require("../controller.route");



const handleLiveBusLocation = async function(busLocation,socket){
    const busID = socket.handshake.query.busID;
    console.log(`bus ${busID} is connected`);

    const currentLocationRef = getCurrentLocationRef(busID);
  

    currentLocationRef.on('value',(snapshot)=>{
        const currentLocation = snapshot.val();
        makeNodeRelation(currentLocation)
        console.log("currentLocation",currentLocation)
        socket.emit("currentLocation",currentLocation);   
    })
}


module.exports = {handleLiveBusLocation}