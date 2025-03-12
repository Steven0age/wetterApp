import "./style.scss";
import "./normalize.scss";
import { getDataFromAPI } from "./api";
import {
  renderCurrentWeather,
  renderHourlyForecast,
  renderDailyForecast,
  renderWeatherDetails,
  renderWeatherForecastPage,
  renderLoadingScreen,
  setBackground,
} from "./DomManipulation";

export let currentWeather = { data: null };

async function loadWeather(city) {
  renderLoadingScreen();
  let newWeatherData = await getDataFromAPI(city);
  currentWeather = newWeatherData;
  renderWeatherForecastPage();
  setBackground();
  renderCurrentWeather();
  renderHourlyForecast();
  renderDailyForecast();
  renderWeatherDetails();
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

//loadWeather("Dresden");
