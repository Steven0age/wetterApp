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

export async function renderHourlyForecast() {
  let data = await getCurrentWeather();
  let currentHourTimeStamp = await findCurrentHour();
  let hourlyForecastListEl = document.querySelector(".hourly-forecast__list");
  console.log("currentHourTimeStamp =", currentHourTimeStamp);

  let i = data.forecast.forecastday[0].hour.findIndex((x) => {
    return x.time_epoch == currentHourTimeStamp;
  });

  let stop = i + 23;
  console.log("indexFound =", i);
  let newHTML = "";
  for (i; i < 24; i++) {
    // console.log("i =", i);
    // console.log("hour=", data.forecast.forecastday[0].hour[i]);
    // console.log(`temperature">${data.forecast.forecastday[0].hour[i].temp_c}°`);
    newHTML += ` 
    <div class="forecast-vertical">
      <p class="forecast-vertical__time">${new Date(
        data.forecast.forecastday[0].hour[i].time_epoch * 1000
      ).getHours()}</p>
      <p class="forecast-vertical__symbol"><img src="${
        data.forecast.forecastday[0].hour[i].condition.icon
      }" alt="${data.forecast.forecastday[0].hour[i].condition.text}"></p>
      <p class="forecast-vertical__temperature">
        ${data.forecast.forecastday[0].hour[i].temp_c}°
      </p>
    </div>`;
  }
  //console.log("newHTML =", newHTML);
  hourlyForecastListEl.innerHTML = newHTML;
  //console.log("hourlyForecastListEl =", hourlyForecastListEl);

  // Step 1 Schleife, die 23x läuft
  // Step 2 23x in der Schleife den HTML Code ausgeben (jeweils mit der Schleifenabfrage = index-Nummer)
  // Step 3 das Ganze in eine Variable packen
  // Step 4 die fertige "Inner-HTML"-Variable returnen

  //   <div class="forecast-vertical">
  //   <p class="forecast-vertical__time">Jetzt</p>
  //   <p class="forecast-vertical__symbol">src="${data.forecast.forecastday[0].day.condition.icon}" alt="${data.forecast.forecastday[0].day.condition.text}</p>
  //   <p class="forecast-vertical__temperature">${data.forecast.forecastday[0].hour[indexOfCurrentHour].temp_c}°</p>
  // </div>
}

export function findCurrentHour() {
  const now = Date.now() / 3600000;
  const currentHour = Math.floor(now);
  const milliSec = (3600000 * currentHour) / 1000;
  //console.log("milliSec ist:", milliSec);
  return milliSec;
  //const newTimestamp = new Date(milliS);
}
