import { currentWeather, getCurrentWeather } from "./main";

let currentWeatherEl = document.querySelector(".current-weather");
let hourlyForecastEl = document.querySelector(".hourly-forecast");

export async function updateCurrentWeather() {
  let data = await getCurrentWeather();
  let currentHourTimeStamp = findCurrentHour();
  let indexOfCurrentHour = data.forecast.forecastday[0].hour.findIndex((x) => {
    return x.time_epoch == currentHourTimeStamp;
  });
  console.log("data ist ", data);
  currentWeatherEl.innerHTML = `
  <p class="current-weather__city">${data.location.name}</p>
        <p class="current-weather__temperature">${data.current.temp_c}</p>
        <p class="current-weather__condition">${data.current.condition.text}</p>
        <p class="current-weather__top-bottom-temp">H:${data.forecast.forecastday[0].day.maxtemp_c}° T:${data.forecast.forecastday[0].day.mintemp_c}°</p>`;

  hourlyForecastEl.innerHTML = `
        <div class="hourly-forecast__description">
          <p class="hourly-forecast__text">
            Heute ${data.current.condition.text}. Wind bis zu ${data.current.wind_kph} km/h.
          </p>
        </div>
        <div class="hourly-forecast__list">
          <div class="forecast-vertical">
            <p class="forecast-vertical__time">Jetzt</p>
            <p class="forecast-vertical__symbol"><img src="${data.forecast.forecastday[0].day.condition.icon}" alt="${data.forecast.forecastday[0].day.condition.text}"></p>
            <p class="forecast-vertical__temperature">${data.forecast.forecastday[0].hour[indexOfCurrentHour].temp_c}°</p>
          </div>
        </div>`;
}

export function findCurrentHour() {
  const now = Date.now() / 3600000;
  const currentHour = Math.floor(now);
  const milliSec = (3600000 * currentHour) / 1000;
  console.log("milliSec ist:", milliSec);
  return milliSec;
  //const newTimestamp = new Date(milliS);
}
