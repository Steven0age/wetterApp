import { currentWeather, getCurrentWeather } from "./main";

let currentWeatherEl = document.querySelector(".current-weather");
let hourlyForecastEl = document.querySelector(".hourly-forecast");

export async function updateCurrentWeather() {
  let data = await getCurrentWeather();
  //console.log("data ist ", data);
  currentWeatherEl.innerHTML = `
  <p class="current-weather__city">${data.location.name}</p>
        <p class="current-weather__temperature">${data.current.temp_c}</p>
        <p class="current-weather__condition">${data.current.condition.text}</p>
        <p class="current-weather__top-bottom-temp">H:${data.forecast.forecastday[0].day.maxtemp_c}° T:${data.forecast.forecastday[0].day.mintemp_c}°</p>`;

  hourlyForecastEl.innerHTML = `
        <div class="hourly-forecast">
        <div class="hourly-forecast__description">
          <p class="hourly-forecast__text">
            Heute ${data.current.condition.text}. Wind bis zu ${data.current.wind_kph} km/h.
          </p>
        </div>
        <div class="hourly-forecast__list">
          <div class="forecast-vertical">
            <p class="forecast-vertical__time">Jetzt</p>
            <p class="forecast-vertical__symbol"><img src="${data.forecast.forecastday[0].day.condition.icon}" alt="${data.forecast.forecastday[0].day.condition.text}"></p>
            <p class="forecast-vertical__temperature">8°</p>
          </div>
        </div>
      </div>`;
}

export function findNow() {
  const d = new Date();
  console.log("d: ", d);
  const egal = d.getHours();
  console.log("hour: ", egal);
  const timestamp = Date.now();
  //let seconds = d.getSeconds();
  console.log("timestamp: ", timestamp);

  const hour = Date.now() / 3600000;
  const whole_Hour = Math.round(hour);
  const milliS = 3600000 * whole_Hour;
  const newTimestamp = new Date(milliS);
  console.log("newTimestamp =", newTimestamp);
}
