let distanceChange = function () {
  const distanceUnit = document.getElementById("milesOrKM").value
  document.getElementById("average-speed").innerHTML = distanceUnit;
}
let hoursChange = function () {
  let input = document.getElementById("hours").value
  console.log(input)
}

//listeners
document.getElementById("milesOrKM").addEventListener("change", distanceChange)

document.getElementById("hours").addEventListener("input", hoursChange)