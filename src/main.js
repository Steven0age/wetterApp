import "./style.scss";
import "./normalize.scss";
import { getDataFromAPI } from "./api";
import {
  findCurrentHour,
  renderCurrentWeather,
  renderHourlyForecast,
} from "./DomManipulation";

export let currentWeather = { data: null };

async function loadWeather(city) {
  let newWeatherData = await getDataFromAPI(city);
  currentWeather = newWeatherData;
  //console.log("currentWeather ist", currentWeather);
  renderCurrentWeather();
  renderHourlyForecast();
}

export function getCurrentWeather() {
  return currentWeather;
}

loadWeather("Dresden");
