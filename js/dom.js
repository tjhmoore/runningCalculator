const speedData = {
  distance: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  miles: true,
}

const distanceData = {
  speed: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  miles: true,
}

function calculateSpeedWithoutDecimalRounding() {
  const time = Number(speedData.hours) + Number(speedData.minutes / 60) + Number(speedData.seconds / 3600)
  console.log('time', time)
  console.log('decimal minutes', Number(speedData.minutes / 60))
  console.log('decimal minutes raw', 30 / 60)
  console.log('decimal minutes raw and parse', Number(30 / 60))
  const speed = speedData.distance / time
  return speed
}

function calculateSpeed() {
  const speed = calculateSpeedWithoutDecimalRounding()
  let roundedSpeed = Math.round(speed * 100) / 100 //max of 2 decimal places
  console.log(`minutes ${speedData.minutes}`)
  if (isNaN(roundedSpeed) || !isFinite(roundedSpeed)) {
    return 0
  }
  return roundedSpeed
}

function calculateDistance() {
  const time = Number(distanceData.hours) + Number(distanceData.minutes / 60) + Number(distanceData.seconds / 3600)
  const speed = distanceData.speed
  // console.log(speed)
  console.log(time)
  const distance = (speed / time)
  // console.log(distance)
  if (isNaN(distance) || !isFinite(distance)) {
    return 0
  }
  return distance
}

function calculatePace() {
  const timeInSeconds = (Number(speedData.hours * 3600)) + (Number(speedData.minutes * 60)) + (Number(speedData.seconds))
  const timeInMinutes = (Number(speedData.hours * 60)) + (Number(speedData.minutes)) + (Number(speedData.seconds / 60))
  let paceMinutes = Math.floor(timeInMinutes / speedData.distance)
  let paceSeconds = (timeInSeconds / speedData.distance) % 60
  if (isNaN(paceMinutes)) { paceMinutes = 0} 
  if (isNaN(paceSeconds)) { paceSeconds = 0} 
  paceSeconds = paceSeconds.toFixed(0)
  return `${paceMinutes}m ${paceSeconds}s per`
}

function nanConvert() {
  if (speedData.distance === '') { speedData.distance = 0} 
  if (speedData.hours === '') { speedData.hours = 0} 
  if (speedData.minutes === '') { speedData.minutes = 0} 
  if (speedData.seconds === '') { speedData.seconds = 0} 
  if (distanceData.speed === '') { speedData.speed = 0} 
  if (distanceData.hours === '') { distanceData.hours = 0} 
  if (distanceData.minutes === '') { distanceData.minutes = 0} 
  if (distanceData.seconds === '') { distanceData.seconds = 0} 
}

function updateAverageSpeed() {
  let milesOrKm = speedData.miles ? 'miles' : 'kilometers'
  let milesOrKmUnit = speedData.miles ? 'mph' : 'kmh'
  let mileOrKmSingular = speedData.miles ? 'mile' : 'kilometer'
  nanConvert()
  //average speed
  document.getElementById("average-speed").innerHTML = `
  Speed: ${calculateSpeed()} ${milesOrKmUnit}</br>
  Pace: ${calculatePace()} ${mileOrKmSingular}</br>`
}

function updateDistance() {
  let mileOrKmSingular = distanceData.miles ? 'mile' : 'kilometer'
  nanConvert()
  document.getElementById("distance").innerHTML = `
  Distance: ${calculateDistance().toFixed(2)} ${mileOrKmSingular}</br>
  Pace: ${calculatePace()} ${mileOrKmSingular}</br>`
}

function speedUnitChange() {
  const distanceUnit = document.getElementById("milesOrKM").value
  if (distanceUnit === 'Miles') {
    speedData.miles = true
  }
  else {
    speedData.miles = false
  }
  updateAverageSpeed()
}

function distanceUnitChange() {
  const distanceUnit = document.getElementById("distancecalc-milesOrKM").value
  if (distanceUnit === 'Miles') {
    distanceData.miles = true
  }
  else {
    distanceData.miles = false
  }
  updateDistance()
}

const speedDomUpdate = function () {
  const distance = document.getElementById("speedcalc-distance").value
  const hours = document.getElementById("speedcalc-hours").value
  const minutes = document.getElementById("speedcalc-minutes").value
  const seconds = document.getElementById("speedcalc-seconds").value
  speedData.distance = distance
  speedData.hours = hours
  speedData.minutes = minutes
  speedData.seconds = seconds
  updateAverageSpeed()
}

function distanceDomUpdate() {
  const speed = document.getElementById("distancecalc-speed").value
  const hours = document.getElementById("distancecalc-hours").value
  const minutes = document.getElementById("distancecalc-minutes").value
  const seconds = document.getElementById("distancecalc-seconds").value
  distanceData.speed = speed
  distanceData.hours = hours
  distanceData.minutes = minutes
  distanceData.seconds = seconds
  updateDistance()
}

//listeners
document.getElementById("milesOrKM").addEventListener("change", speedUnitChange)
document.getElementById("speedcalc-distance").addEventListener("input", speedDomUpdate)
document.getElementById("speedcalc-hours").addEventListener("input", speedDomUpdate)
document.getElementById("speedcalc-minutes").addEventListener("input", speedDomUpdate)
document.getElementById("speedcalc-seconds").addEventListener("input", speedDomUpdate)
document.getElementById("distancecalc-milesOrKM").addEventListener("change", distanceUnitChange)
document.getElementById("distancecalc-speed").addEventListener("input", distanceDomUpdate)
document.getElementById("distancecalc-hours").addEventListener("input", distanceDomUpdate)
document.getElementById("distancecalc-minutes").addEventListener("input", distanceDomUpdate)
document.getElementById("distancecalc-seconds").addEventListener("input", distanceDomUpdate)

//for first load of page
updateAverageSpeed()
updateDistance()