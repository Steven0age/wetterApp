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
  listenBackButton,
  listenFavoritButton,
  clearBackground,
  renderSavedWeather,
} from "./DomManipulation";
import { loadFromLocalStorage, saveToLocalStorage } from "./localStorage";

export let currentWeather = { data: null };
export let storedWeather = [];

export function loadStoredWeatherIDs() {
  let data = [];
  data = loadFromLocalStorage();
  storedWeather = data;
}

export async function loadMainPage() {
  renderLoadingScreen();
  clearBackground();
  renderMainPage();
  renderSavedWeather(storedWeather);
}
export async function loadDetailedWeatherPage(cityID) {
  renderLoadingScreen("PLATZHALTER");

  let newWeatherData = await getDataFromAPI(cityID);
  currentWeather = newWeatherData;

  renderWeatherForecastPage();
  setBackground();
  renderCurrentWeather();
  renderHourlyForecast();
  renderDailyForecast();
  renderWeatherDetails();
  listenBackButton();
  listenFavoritButton(currentWeather.location.name);
}

export function getCurrentWeather() {
  return currentWeather;
}

export function saveCurrentWeather(cityID) {
  console.log("storedWeather =", storedWeather);
  if (!storedWeather) {
    storedWeather = cityID;
    console.log("storedWeather2 =", storedWeather);
  } else {
    storedWeather.push(cityID);
  }
  saveToLocalStorage(storedWeather);
  console.log("storedWeather3 =", storedWeather);
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

loadStoredWeatherIDs();
loadMainPage();
//loadDetailedWeatherPage("575184");
//loadDetailedWeatherPage("2801268");
