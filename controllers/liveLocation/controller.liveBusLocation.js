const { getCurrentLocationRef } = require("../../models/firebase/model.firebase");



const handleLiveBusLocation = async function(busLocation,socket){
    const busID = socket.handshake.query.busID;
    console.log(`bus ${busID} is connected`);

    const currentLocationRef = getCurrentLocationRef(busID);

    currentLocationRef.on('value',(snapshot)=>{
        const currentLocation = snapshot.val();
        console.log(currentLocation)
        socket.emit("currentLocation",currentLocation);   
    })
}


module.exports = {handleLiveBusLocation}