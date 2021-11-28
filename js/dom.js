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

console.log(`The 5km world records are held by ${worldRecords.fivekm.male.name} and ${worldRecords.fivekm.female.name} with running times of ${worldRecords.fivekm.male.time.minutes} minutes and ${worldRecords.fivekm.male.time.seconds} seconds and ${worldRecords.fivekm.female.time.minutes} minutes and ${worldRecords.fivekm.female.time.seconds} seconds respectively`)

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
  document.getElementById("average-speed").innerHTML = `Your distance is ${runningData.distance} ${milesOrKm}. </br> Your running time is ${runningData.hours} hours, ${runningData.minutes} minutes and ${runningData.seconds} seconds. </br>
  Your average speed was ${calculateSpeed()} ${milesOrKmUnit}</br>
  Your average pace was ${calculatePace()} ${mileOrKmSingular}</br>`
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

let distanceChange = function () {
  let input = document.getElementById("distance").value
  runningData.distance = input
  updateAverageSpeed()
}

let hoursChange = function () {
  let input = document.getElementById("hours").value
  runningData.hours = input
  updateAverageSpeed()
}
let minutesChange = function () {
  let input = document.getElementById("minutes").value
  runningData.minutes = input
  updateAverageSpeed()
}
let secondsChange = function () {
  let input = document.getElementById("seconds").value
  runningData.seconds = input
  updateAverageSpeed()
}

updateAverageSpeed()

//listeners
document.getElementById("milesOrKM").addEventListener("change", distanceUnitChange)
document.getElementById("distance").addEventListener("input", distanceChange)
document.getElementById("hours").addEventListener("input", hoursChange)
document.getElementById("minutes").addEventListener("input", minutesChange)
document.getElementById("seconds").addEventListener("input", secondsChange)