function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hour}:${minutes}`;
}

function getCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

function search(city) {
  let apiKey = "ea34ad36f9tbf5ceb9037o7457b5a408";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(getInformation);
}

function getInformation(response) {
  console.log(response.data);

  celsiusTemperature = response.data.temperature.current;
  document.querySelector("#temp-value").innerHTML =
    Math.round(celsiusTemperature);

  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  let humidity = response.data.temperature.humidity;
  document.querySelector("#humidity").innerHTML = `${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = ` ${wind} km/h`;

  feels = Math.round(response.data.temperature.feels_like);
  document.querySelector("#feelsLike").innerHTML = `${feels}˚C`;

  document.querySelector("#city").innerHTML = response.data.city;

  iconElement.setAttribute("src", response.data.condition.icon_url);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);
}
function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ea34ad36f9tbf5ceb9037o7457b5a408";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(apiUrl).then(getInformation);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-value");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-value");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let degreeFahrenheit = document.querySelector("#degreeFahrenheit");
degreeFahrenheit.addEventListener("click", displayFahrenheitTemperature);

let degreeCelsius = document.querySelector("#degreeCelsius");
degreeCelsius.addEventListener("click", displayCelsiusTemperature);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCity);

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", currentLocation);

search("New York");
