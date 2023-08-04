function formatedDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
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

function formatday(timeStamp) {
let date = new Date(timeStamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
return day[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
    forecastHTML += 
    `
      <div class="col-2">
        <div class="weather-forecast-date">${formatedDay(forecastDay.dt)}</div>
        <img
          src="https://openweathermap.org/img/wn/${dayData.weather[0].icon}.png"
          alt="${dayData.weather[0].description}"
          width="36"
        />
        <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-max">${Math.round(dayData.temp.max)}°</span>
          <span class="weather-forecast-temperature-min">${Math.round(dayData.temp.min)}°</span>
        </div>
      </div>
    `;
    }
  });
  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    console.log(coordinates);
    let apikey = "ed238469f9b5e9d801834270e65449bc";
    let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=matric`;
    axios.get(apiUrl).then(displayForecast);
}

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
  ).innerHTML = `${response.data.weather[0].precipitation} %`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord)
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ed238469f9b5e9d801834270e65449bc&units=metric`;
  let apiKey = "ed238469f9b5e9d801834270e65449bc";
  axios.get(apiUrl).then(displayWeather);
}


function press(event) {
  event.preventDefault();
  let city = document.querySelector("#input-search").value;
  searchCity(cityInputElement.value);
}

function displayFahrenheitLinkTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempereture");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusLinkTemperature(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let temperatureElement = document.querySelector("#tempereture");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

function searchLocation(position) {
  let apiKey = "ed238469f9b5e9d801834270e65449bc";
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
