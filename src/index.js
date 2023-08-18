function formatDate(timestamp) {
	let now = new Date();
	Date(timestamp);
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
}
	let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  let dateTime = document.getElementById("date-time");
  dateTime.innerHTML =
  day + " " + hours + ":" + (minutes < 10 ? "0" : "") + minutes + " " + ampm;

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	return days[day];
}

function displayForecast(response) {
	let forecast = response.data.daily;
	let forecastElement = document.querySelector("#forecast");

	let forecastHTML = `<div class="row">`;
	forecast.forEach(function (forecastDay, index) {
    if(index < 6) {
		forecastHTML =
      forecastHTML +
      `
				<div class="col-2">
         <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
					<img
						src="https://openweathermap.org/img/wn/02d@2x.png"
							alt=""
							width="36"
							/>
				<div class="weather-forecast-temperature">
					<span class="weather-forecast-temperature-max">
						${Math.round(forecastDay.temp.max)}°
							</span>
					<span class="weather-forecast-temperature-min">
						${Math.round(forecastDay.temp.min)}°
							 </span>
									</div>
								 </div>
								 `;
    }
	});

	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
	let apikey = "6fd665f227453ba8279e3d39e454b700";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&units=metric`;
	axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response) {
	let temperatureElement = document.querySelector("#temperature");
	let cityElement = document.querySelector("#city");
	let descriptionElement = document.querySelector("#description");
	let humidityElement = document.querySelector("#humidity");
	let windElement = document.querySelector("#wind");
	let precipitationElemnt = document.querySelector("#precipitation");
	let dateElement = document.querySelector("#date");
	let iconElement = document.querySelector("#icon");

	celciusTemperature = response.data.main.temp;
	temperatureElement.innerHTML = Math.round(response.data.main.temp);
	cityElement.innerHTML = response.data.name;
	descriptionElement.innerHTML = response.data.weather[0].description;
	humidityElement.innerHTML = response.data.main.humidity;
	windElement.innerHTML = Math.round(response.data.wind.speed);
	precipitationElemnt.innerHTML = response.data.main.humidity;
	dateElement.innerHTML = formatDate(response.data.dt * 1000);
	iconElement.setAttribute(
		"src",
		`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);

	iconElement.setAttribute("alt", response.data.weather[0].description);
	getForecast(response.data.coord);
}

function searchCity(city) {
	let apikey = "6fd665f227453ba8279e3d39e454b700";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=6fd665f227453ba8279e3d39e454b700&units=metric`;
	axios.get(apiUrl).then(response => {
		let coordinates = response.data.coord;
		getForecast(coordinates);
		displayTemperature(response);
	});
}

function getcurrentLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;

      let apikey = "6fd665f227453ba8279e3d39e454b700";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;

      axios.get(apiUrl).then((response) => {
        let coordinates = response.data.coord;
        getForecast(coordinates);
        displayTemperature(response);
      });
    });
  } else {
    alert("Geolocation is not available in your browser.");
  }
}

function press(event) {
	event.preventDefault();
	let cityInputElement = document.querySelector("#city-input");
	search(cityInputElement.value);
}

function displayfahrenheitLinkTemperature(event) {
	event.preventDefault();
	let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

	celsiusLink.classList.remove("active");
	fahrenheitLink.classList.add("active");
	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
	alert(fahrenheitTemperature);
}

function displaycelsiusTemperature(event) {
	event.preventDefault();
	celsiusLink.classList.add("active");

	fahrenheitLink.classList.remove("active");
	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = Math.round(celciusTemperature);
}

celciusTemperature = null;

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getcurrentLocation);

let form = document.querySelector("#search-form");
form.addEventListener("click", searchFor);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displaycelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayfahrenheitLinkTemperature);

searchCity("Cape Town");
