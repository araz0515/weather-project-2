function getDay(date) {
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
  let time = document.querySelector("#date");
  time.innerHTML = `${day} ${hour}:${minutes}`;
}

getDay(new Date());

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
  document.querySelector("#temp-value").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  let humidity = response.data.temperature.humidity;
  document.querySelector("#humidity").innerHTML = `${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = ` ${wind} km/h`;

  feels = Math.round(response.data.temperature.feels_like);
  document.querySelector("#feelsLike").innerHTML = `${feels}˚C`;

  document.querySelector("#city").innerHTML = response.data.city;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCity);

search("New York");
