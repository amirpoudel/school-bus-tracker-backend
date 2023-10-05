

function matchLocation(firstLocation, secondLocation) {

    console.log(firstLocation.latitude)
    console.log(secondLocation.latitude)

    console.log(firstLocation.longitude)    
    console.log(secondLocation.longitude)
    

    // convert to string 
    const firstLatitude = Math.trunc(firstLocation?.latitude * 1000);
    const firstLongitude = Math.trunc(firstLocation?.longitude * 1000);


    const secondLatitude = Math.trunc(secondLocation?.latitude * 1000);
    const secondLongitude = Math.trunc(secondLocation?.longitude * 1000);
   // console.log(firstLatitude, firstLongitude, secondLatitude, secondLongitude)

    if (firstLatitude === secondLatitude && firstLongitude === secondLongitude) {
        return true
    } else {
        return false
    }
}



function calculateTime(previousLocation, currentLocation) {

    let prevTime = previousLocation.time;
    let currTime = currentLocation.time;

    const date1 = new Date(`1970-01-01T${prevTime}Z`);
    const date2 = new Date(`1970-01-01T${currTime}Z`);

    // Calculate the difference in minutes
    const diff = date1 - date2;

    const totalMinutes = diff / (1000 * 60);

    return totalMinutes;
}



module.exports = { matchLocation,calculateTime }