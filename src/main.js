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
  renderMainPage,
  listenWeatherTile,
  listenBackButton,
  listenFavoritButton,
  clearBackground,
} from "./DomManipulation";

export let currentWeather = { data: null };

export async function loadMainPage() {
  clearBackground();
  renderLoadingScreen();
  renderMainPage();
  listenWeatherTile();
}
export async function loadWeather(cityID) {
  renderLoadingScreen("Dresden");
  let newWeatherData = await getDataFromAPI(cityID);
  currentWeather = newWeatherData;
  renderWeatherForecastPage();
  setBackground();
  renderCurrentWeather();
  renderHourlyForecast();
  renderDailyForecast();
  renderWeatherDetails();
  listenBackButton();
  listenFavoritButton();
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

loadMainPage();
//loadWeather("575184");
