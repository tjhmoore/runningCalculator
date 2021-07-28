// Miles to KM calculation
let miles

function milesToKm(miles){
    outputInMiles = miles/0.62137;
    return outputInMiles.toFixed(2);
}

// KM to Miles calculation
let km
function kmToMiles(km){
    outputInKm = km*0.62137
    return outputInKm.toFixed(2);
}

//Outputs
console.log(milesToKm(20))
console.log(kmToMiles(16.093470878864444))