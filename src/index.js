function formatedDate(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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

  return `${day} ${hour}:${minutes}`;
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Tue", "Wed", "Thu", "Fri", "sat", "sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
                         <div class="col-2">
                          <div class="weather-forecast-date">${day}</div> 
                          <img
                           src="https://openweathermap.org/img/wn/02d@2x.png"
                           alt=""
                           width="36"
                            />
                        <div class="weather-forecast-temperature">
                          <span class="weather-forecast-temperature-max">
                          18°
                          </span>
                          <span class="weather-forecast-temperature-min">
                          10°
                           </span>
                    </div>
                 </div>
                 `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apikey = "6fd665f227453ba8279e3d39e454b700";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&units=matric`;
  axios.get(apiUrl).then(displayForecast);
}

let now = document.querySelector("li.time");
let currentTime = new Date();
now.innerHTML = formatedDate(currentTime);
let iconElement = document.querySelector("#icon");

function displayWeather(response) {
  celsiusTemperature = response.data.main.temp;

  let roundedTemp = Math.round(response.data.main.temp);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#digit").innerHTML = `${roundedTemp}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#winds").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector(
    "#precipitation"
  ).innerHTML = `${response.data.main.humidity} %`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchCity(city) {
  let apiKey = "6fd665f227453ba8279e3d39e454b700";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

let celsiusTemperature = null;

function press(event) {
  event.preventDefault();
  let city = document.querySelector("#input-search").value;
  searchCity(city);
}

function displayFahrenheitLinkTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#digit");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusLinkTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#digit");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function searchLocation(position) {
  let apiKey = "6fd665f227453ba8279e3d39e454b700";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(function (response) {
    displayWeather(response.data);
    celsiusTemperature = response.data.main.temp;
  });
}

function displayLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", press);
searchCity("Cape Town");

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", displayLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitLinkTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusLinkTemperature);
