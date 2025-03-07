import moment from "moment/moment";
import { getCurrentWeather, findCurrentHour, dayNames } from "./main";

let currentWeatherEl = document.querySelector(".current-weather");
let hourlyForecastEl = document.querySelector(".hourly-forecast");
//let hourlyForecastListEl = document.querySelector(".hourly-forecast__list");

export async function renderCurrentWeather() {
  let data = await getCurrentWeather();

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
  console.log("currentHourTimeStamp", currentHourTimeStamp);
  let hourlyForecastListEl = document.querySelector(".hourly-forecast__list");
  let indexOfCurrentHour = data.forecast.forecastday[0].hour.findIndex((x) => {
    return x.time_epoch == currentHourTimeStamp;
  });
  let i = indexOfCurrentHour;
  let maxLoopsToday = 24 - i;
  let newHTML = "";

  newHTML += `
    <div class="forecast-vertical">
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

export async function renderDailyForecast() {
  let data = await getCurrentWeather();
  let dailyForecastListEl = document.querySelector(".daily-forecast");
  console.log(
    "Max Temp heute= ",
    data.forecast.forecastday[0].day.condition.icon
  );
  let tomorrow = dayNames(data.forecast.forecastday[1].date_epoch);
  let dayAfterTomorrow = dayNames(data.forecast.forecastday[2].date_epoch);

  let newHTML = `
  <div class="daily-forecast__description">
    <p class="daily-forecast__text">
      Vorhersage für die nächsten 3 Tage:
    </p>
  </div>
  <div class="forecast-horizontal">
    <div class="forecast-horizontal__day">Heute</div>
    <div class="forecast-horizontal__symbol"><img src="${
      data.forecast.forecastday[0].day.condition.icon
    }" alt="${data.forecast.forecastday[0].day.condition.text}"></img></div>
    <div class="forecast-horizontal__hottest">H:${Math.floor(
      data.forecast.forecastday[0].day.maxtemp_c
    )}°</div>
    <div class="forecast-horizontal__coldest">T:${Math.floor(
      data.forecast.forecastday[0].day.mintemp_c
    )}°</div>
    <div class="forecast-horizontal__wind">Wind: ${
      data.forecast.forecastday[0].day.maxwind_kph
    } Km/h</div>
  </div>
  <div class="forecast-horizontal">
    <div class="forecast-horizontal__day">${tomorrow}</div>
    <div class="forecast-horizontal__symbol"><img src="${
      data.forecast.forecastday[0].day.condition.icon
    }" alt="${data.forecast.forecastday[1].day.condition.text}"></img></div>
    <div class="forecast-horizontal__hottest">H:${Math.floor(
      data.forecast.forecastday[1].day.maxtemp_c
    )}°</div>
    <div class="forecast-horizontal__coldest">T:${Math.floor(
      data.forecast.forecastday[1].day.mintemp_c
    )}°</div>
    <div class="forecast-horizontal__wind">Wind: ${
      data.forecast.forecastday[1].day.maxwind_kph
    } Km/h</div>
  </div>
  <div class="forecast-horizontal">
    <div class="forecast-horizontal__day">${dayAfterTomorrow}</div>
    <div class="forecast-horizontal__symbol"><img src="${
      data.forecast.forecastday[0].day.condition.icon
    }" alt="${data.forecast.forecastday[2].day.condition.text}"></img></div>
    <div class="forecast-horizontal__hottest">H:${Math.floor(
      data.forecast.forecastday[2].day.maxtemp_c
    )}°</div>
    <div class="forecast-horizontal__coldest">T:${Math.floor(
      data.forecast.forecastday[2].day.mintemp_c
    )}°</div>
    <div class="forecast-horizontal__wind">Wind: ${
      data.forecast.forecastday[2].day.maxwind_kph
    } Km/h</div>
  </div>`;

  dailyForecastListEl.innerHTML = newHTML;
}

export async function renderWeatherDetails() {
  let data = await getCurrentWeather();
  let weatherDetailsEl = document.querySelector(".weather-details");
  let newHTML = "";
  let dataArr = [
    {
      headline: "Feuchtigkeit",
      value: `${data.current.humidity}%`,
    },
    {
      headline: "Gefühlt",
      value: `${data.current.feelslike_c}°`,
    },
    {
      headline: "Sonnenaufgang",
      value: `${moment(
        data.forecast.forecastday[0].astro.sunrise,
        "h:mm:sss A"
      ).format("HH:mm")} Uhr`,
    },
    {
      headline: "Sonnenuntergang",
      value: `${moment(
        data.forecast.forecastday[0].astro.sunset,
        "h:mm:sss A"
      ).format("HH:mm")} Uhr`,
    },
    {
      headline: "Niederschlag",
      value: `${data.forecast.forecastday[0].day.totalprecip_mm}mm`,
    },
    {
      headline: "UV-Index",
      value: `${Math.floor(data.forecast.forecastday[0].day.uv)}`,
    },
  ];
  console.log("dataArr =", dataArr);

  dataArr.forEach((a) => {
    newHTML += `
              <div class="detail-block">
                <p class="detail-block__headline">${a.headline}</p>
                <p class="detail-block__information">${a.value}</p>
              </div>`;
  });
  //console.log("newHTML =", newHTML);
  console.log("Moment =", moment("06:34 PM", "h:mm:sss A").format("HH:mm"));
  weatherDetailsEl.innerHTML = newHTML;
}
