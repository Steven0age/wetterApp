import moment from "moment/moment";
import {
  getCurrentWeather,
  findCurrentHour,
  dayNames,
  loadDetailedWeatherPage,
  loadMainPage,
} from "./main";
import { getConditionImagePath } from "./conditions";
import { getDataFromAPI } from "./api";

export function renderMainPage() {
  let appEl = document.querySelector(".app");
  let newHTML;
  newHTML = `
<div class="main-menu">
        <h1 class="main-menu__headline">Wetter</h1>
        <p class="main-menu_options">Bearbeiten</p>
      </div>
      <input
        class="search-bar"
        type="search"
        placeholder="Nach Stadt suchen..."
      />
      <div class="saved-weather">
      </div>
`;
  appEl.innerHTML = newHTML;
}

export async function renderWeatherTile(cityID) {
  let data = await getDataFromAPI(cityID);
  let savedWeatherEl = document.querySelector(".saved-weather");
  let newHTML;
  let code = data.current.condition.code;
  let is_day = data.current.is_day;

  let imgUrl = getConditionImagePath(code, is_day);

  newHTML = `<div class="weather-tile" style="background-image:url(${imgUrl})" data-weather-id="${cityID}">
          <div class="weather-tile__infos-top">
            <div class="weather-tile__infos-topleft">
              <h2 class="weather-tile__city">${data.location.name}</h2>
              <p class="weather-tile__country">${data.location.country}</p>
            </div>
            <div class="weather-tile__infos-topright">
              <p class="weather-tile__current-temp">${Math.floor(
                data.current.temp_c
              )}°</p>
            </div>
          </div>
          <div class="weather-tile__infos-bottom">
            <div class="weather-tile__infos-bottomleft">
              <p class="weather-tile__condition">${
                data.current.condition.text
              }</p>
            </div>
            <div class="weather-tile__infos-bottomright">
              <p class="weather-tile__top-bottom-temp">H:${
                data.forecast.forecastday[0].day.maxtemp_c
              }° T:${data.forecast.forecastday[0].day.mintemp_c}°</p>
            </div>
          </div>
        </div>
      </div>`;

  savedWeatherEl.innerHTML = newHTML;
}

export function listenWeatherTile() {
  const weatherTileEl = document.querySelectorAll(".weather-tile");

  weatherTileEl.forEach((tile) =>
    tile.addEventListener("click", () => {
      loadDetailedWeatherPage(tile.getAttribute("data-weather-id"));
    })
  );
}

export function listenBackButton() {
  const backButtonEl = document.querySelector(".in-weather-navigation__back");
  backButtonEl.addEventListener("click", loadMainPage);
}

export function listenFavoritButton() {
  const backButtonEl = document.querySelector(
    ".in-weather-navigation__favorit"
  );
  backButtonEl.addEventListener("click", loadMainPage);
}

export async function setBackground() {
  let data = await getCurrentWeather();
  let code = data.current.condition.code;
  let is_day = data.current.is_day;
  let appEl = document.querySelector(".app--show-current-Weather");

  let imgUrl = getConditionImagePath(code, is_day);
  appEl.style.backgroundImage = `url(${imgUrl})`;
}

export function clearBackground() {
  let appEl = document.querySelector(".app");
  appEl.removeAttribute("style");
  appEl.className = "app";
}

export function renderLoadingScreen(city = null) {
  let appEl = document.querySelector(".app");
  let newHTML;
  if (!city) {
    newHTML = `
  <div class="loading">  
  <p> Lade Übersicht ... </p>
  <div class="lds-ripple">
            <div></div>
            <div></div>
          </div>
          </div>`;
  } else {
    newHTML = `
  <div class="loading">  
  <p> Lade Wetter für ${city} ... </p>
  <div class="lds-ripple">
            <div></div>
            <div></div>
          </div>
          </div>
  `;
  }
  appEl.innerHTML = newHTML;
}
export async function renderWeatherForecastPage() {
  let appEl = document.querySelector(".app");
  appEl.classList.add("app--show-current-Weather");
  let newHTML;
  newHTML = `
     <div class="in-weather-navigation">
        <p class="in-weather-navigation__item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="in-weather-navigation__back"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </p>
        <p class="in-weather-navigation__item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="in-weather-navigation__favorit"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        </p>
      </div>
      <div class="current-weather">
      </div>
      <div class="hourly-forecast">
        <div class="hourly-forecast__list">
        </div>
      </div>
      <div class="daily-forecast">
      </div>
      <div class="weather-details">
      </div>
    </div>
          `;
  appEl.innerHTML = newHTML;
}
export async function renderCurrentWeather() {
  let currentWeatherEl = document.querySelector(".current-weather");
  let hourlyForecastEl = document.querySelector(".hourly-forecast");

  let data = await getCurrentWeather();

  currentWeatherEl.innerHTML = `
  <p class="current-weather__city">${data.location.name}</p>
        <p class="current-weather__temperature">${Math.floor(
          data.current.temp_c
        )}°</p>
        <p class="current-weather__condition">${data.current.condition.text}</p>
        <p class="current-weather__top-bottom-temp">H:${
          data.forecast.forecastday[0].day.maxtemp_c
        }° T:${data.forecast.forecastday[0].day.mintemp_c}°</p>`;

  hourlyForecastEl.innerHTML = `
        <div class="hourly-forecast__description">
          <p class="hourly-forecast__text">
            Heute: ${data.forecast.forecastday[0].day.condition.text}. Wind bis zu ${data.forecast.forecastday[0].day.maxwind_kph} km/h.
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
