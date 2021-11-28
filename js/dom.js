const runningData = {
  distance: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  miles: true
}

const worldRecords = {
  fivekm: {
    male: {
      name: 'Joshua Cheptegei', 
      time: {
        minutes: 12,
        seconds: 35,
      }
    },
    female: {
      name: 'Letesenbet Gidey',
      time: {
        minutes: 14,
        seconds: 06, 
      }
    }
  }
}

const calculateSpeedWithoutDecimalRounding = function () {
  const time = (runningData.hours) + (runningData.minutes / 60) + (runningData.seconds / 3600)
  const speed = runningData.distance / time
  return speed
}

let calculateSpeed = function () {
  const speed = calculateSpeedWithoutDecimalRounding()
  let roundedSpeed = Math.round(speed * 100) / 100 //max of 2 decimal places
  if (isNaN(roundedSpeed) || !isFinite(roundedSpeed)) {
    return 0
  }
  return roundedSpeed
}

let calculatePace = function () {
  const timeInSeconds = (parseInt(runningData.hours * 3600)) + (parseInt(runningData.minutes * 60)) + (parseInt(runningData.seconds))
  const timeInMinutes = (parseInt(runningData.hours * 60)) + (parseInt(runningData.minutes)) + (parseInt(runningData.seconds / 60))
  let paceMinutes = Math.floor(timeInMinutes / runningData.distance)
  let paceSeconds = (timeInSeconds / runningData.distance) % 60
  if (isNaN(paceMinutes)) { paceMinutes = 0 }
  if (isNaN(paceSeconds)) { paceSeconds = 0 }
  paceSeconds = paceSeconds.toFixed(0)
  return `${paceMinutes}m ${paceSeconds}s per`
}

let nanConvert = function () {
  if (runningData.distance === '') { runningData.distance = 0 }
  if (runningData.hours === '') { runningData.hours = 0 }
  if (runningData.minutes === '') { runningData.minutes = 0 }
  if (runningData.seconds === '') { runningData.seconds = 0 }
}

let updateAverageSpeed = function () {
  let milesOrKm = runningData.miles ? 'miles' : 'kilometers'
  let milesOrKmUnit = runningData.miles ? 'mph' : 'kmh'
  let mileOrKmSingular = runningData.miles ? 'mile' : 'kilometer'
  nanConvert()
  //average speed
  document.getElementById("average-speed").innerHTML = `Your distance is ${runningData.distance} ${milesOrKm}. </br> Your running time is ${runningData.hours} hours, ${runningData.minutes} minutes and ${runningData.seconds} seconds. </br>
  Your average speed was ${calculateSpeed()} ${milesOrKmUnit}</br>
  Your average pace was ${calculatePace()} ${mileOrKmSingular}</br>`
  //world records
  document.getElementById("world-records").innerHTML = `The 5km world records are held by <b>${worldRecords.fivekm.male.name}</b> and <b>${worldRecords.fivekm.female.name}</b> with running times of <b>${worldRecords.fivekm.male.time.minutes} minutes and ${worldRecords.fivekm.male.time.seconds} seconds</b> and <b>${worldRecords.fivekm.female.time.minutes} minutes and ${worldRecords.fivekm.female.time.seconds} seconds</b> respectively
  Your time is 
  `
}

let distanceUnitChange = function () {
  const distanceUnit = document.getElementById("milesOrKM").value
  if (distanceUnit === 'Miles') {
    runningData.miles = true
  }
  else {
    runningData.miles = false
  }
  updateAverageSpeed()
}

let domUpdate = function () {
  const distance = document.getElementById("distance").value
  const hours = document.getElementById("hours").value
  const minutes = document.getElementById("minutes").value
  const seconds = document.getElementById("seconds").value
  runningData.distance = distance
  runningData.hours = hours
  runningData.minutes = minutes
  runningData.seconds = seconds
  updateAverageSpeed()
}

//listeners
document.getElementById("milesOrKM").addEventListener("change", distanceUnitChange)
document.getElementById("distance").addEventListener("input", domUpdate)
document.getElementById("hours").addEventListener("input", domUpdate)
document.getElementById("minutes").addEventListener("input", domUpdate)
document.getElementById("seconds").addEventListener("input", domUpdate)

//for first load of page
updateAverageSpeed()
