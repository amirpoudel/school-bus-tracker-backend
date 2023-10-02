
const db = require("../../databaseConfig/config.firebase")
0
function getCurrentLocationRef(busID){
   return db.ref(`busLocation/${busID}/currentLocation`);
}

function getHistoryLocationRef(busID){
    return db.ref(`busLocation/${busID}/locationHistory`)
}

module.exports  = {getCurrentLocationRef,getHistoryLocationRef};