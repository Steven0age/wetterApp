import { currentWeather, getCurrentWeather } from "./main";

let currentWeatherEl = document.querySelector(".current-weather");
let hourlyForecastEl = document.querySelector(".hourly-forecast");
//let hourlyForecastListEl = document.querySelector(".hourly-forecast__list");

export async function renderCurrentWeather() {
  let data = await getCurrentWeather();
  let currentHourTimeStamp = findCurrentHour();
  let indexOfCurrentHour = data.forecast.forecastday[0].hour.findIndex((x) => {
    return x.time_epoch == currentHourTimeStamp;
  });
  currentWeatherEl.innerHTML = `
  <p class="current-weather__city">${data.location.name}</p>
        <p class="current-weather__temperature">${Math.floor(
          data.current.temp_c
        )}</p>
        <p class="current-weather__condition">${data.current.condition.text}</p>
        <p class="current-weather__top-bottom-temp">H:${
          data.forecast.forecastday[0].day.maxtemp_c
        }° T:${data.forecast.forecastday[0].day.mintemp_c}°</p>`;

  hourlyForecastEl.innerHTML = `
        <div class="hourly-forecast__description">
          <p class="hourly-forecast__text">
            Heute ist es ${data.forecast.forecastday[0].day.condition.text}. Wind bis zu ${data.forecast.forecastday[0].day.maxwind_kph} km/h.
          </p>
        </div>
        <div class="hourly-forecast__list">
        </div>`;
}

export async function renderHourlyForecast() {
  let data = await getCurrentWeather();
  let currentHourTimeStamp = await findCurrentHour();
  let hourlyForecastListEl = document.querySelector(".hourly-forecast__list");
  let i = data.forecast.forecastday[0].hour.findIndex((x) => {
    return x.time_epoch == currentHourTimeStamp;
  });
  let maxLoopsToday = 24 - i;
  let newHTML = "";

  newHTML += `<div class="forecast-vertical">
      <p class="forecast-vertical__time">Jetzt</p>
      <p class="forecast-vertical__symbol"><img src="${
        data.forecast.forecastday[0].hour[i].condition.icon
      }" alt="${data.forecast.forecastday[0].hour[i].condition.text}"></p>
      <p class="forecast-vertical__temperature">
        ${Math.floor(data.forecast.forecastday[0].hour[i].temp_c)}°
      </p>
      </div>`;

  for (i += 1; i < 24; i++) {
    newHTML += ` 
    <div class="forecast-vertical">
      <p class="forecast-vertical__time">${new Date(
        data.forecast.forecastday[0].hour[i].time_epoch * 1000
      ).getHours()} Uhr</p>
      <p class="forecast-vertical__symbol"><img src="${
        data.forecast.forecastday[0].hour[i].condition.icon
      }" alt="${data.forecast.forecastday[0].hour[i].condition.text}"></p>
      <p class="forecast-vertical__temperature">
        ${Math.floor(data.forecast.forecastday[0].hour[i].temp_c)}°
      </p>
    </div>`;
  }

  if (maxLoopsToday > 0) {
    for (let x = 0; x < 24 - maxLoopsToday; x++) {
      newHTML += `
      <div class="forecast-vertical">
        <p class="forecast-vertical__time">${new Date(
          data.forecast.forecastday[1].hour[x].time_epoch * 1000
        ).getHours()} Uhr</p>
        <p class="forecast-vertical__symbol"><img src="${
          data.forecast.forecastday[1].hour[x].condition.icon
        }" alt="${data.forecast.forecastday[1].hour[x].condition.text}"></p>
        <p class="forecast-vertical__temperature">
          ${Math.floor(data.forecast.forecastday[1].hour[x].temp_c)}°
        </p>
      </div>`;
    }

    hourlyForecastListEl.innerHTML = newHTML;
  }
}

export function findCurrentHour() {
  const now = Date.now() / 3600000;
  const currentHour = Math.floor(now);
  const milliSec = (3600000 * currentHour) / 1000;
  //console.log("milliSec ist:", milliSec);
  return milliSec;
  //const newTimestamp = new Date(milliS);
}
