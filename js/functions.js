// Miles to KM calculation

function milesToKm(miles) {
    outputInMiles = miles / 0.62137119223733
    return outputInMiles.toFixed(2)
}

function kmToMiles(km) {
    outputInKm = km * 0.62137119223733
    return outputInKm.toFixed(2)
}

//convert time to hours
function timeToHours (hours, minutes, seconds) {
    //todo
}

//time must be in hours
function averageSpeed (distance, time) {
    return (distance/time).toFixed(2)
}

//Outputs
console.log(milesToKm(20))
console.log(kmToMiles(16.093470878864444))
console.log(averageSpeed(10,0.5))