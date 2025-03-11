import "./style.scss";
import "./normalize.scss";
import { getDataFromAPI } from "./api";
import {
  renderCurrentWeather,
  renderHourlyForecast,
  renderDailyForecast,
  renderWeatherDetails,
  renderWeatherForecastPage,
  renderLoadCurrentWeather,
} from "./DomManipulation";

export let currentWeather = { data: null };

async function loadWeather(city) {
  renderLoadCurrentWeather();
  let newWeatherData = await getDataFromAPI(city);
  currentWeather = newWeatherData;
  console.log("currentWeather ist", currentWeather);
  renderWeatherForecastPage();
  renderCurrentWeather();
  renderHourlyForecast();
  renderDailyForecast();
  renderWeatherDetails();
  setBackground();
}

export function getCurrentWeather() {
  return currentWeather;
}

export function findCurrentHour() {
  const now = Date.now() / 3600000;
  const currentHour = Math.floor(now);
  const milliSec = (3600000 * currentHour) / 1000;
  return milliSec;
}

export function dayNames(timestamp) {
  let weekdays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  const d = new Date(timestamp * 1000);
  let day = weekdays[d.getDay()];
  return day;
}

loadWeather("Dresden");

function setBackground() {
  let appEl = document.querySelector(".app--show-current-Weather");
  appEl.style.backgroundImage =
    "url('/wetterApp/src/assets/conditionImages/day/sunny.jpg')";
}
