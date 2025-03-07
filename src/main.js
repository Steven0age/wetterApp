import "./style.scss";
import "./normalize.scss";
import { getDataFromAPI } from "./api";
import { findNow, updateCurrentWeather } from "./DomManipulation";

export let currentWeather = { data: null };

async function loadWeather(city) {
  let newWeatherData = await getDataFromAPI(city);
  currentWeather = newWeatherData;
  //console.log("currentWeather ist", currentWeather);
  updateCurrentWeather();
}

export function getCurrentWeather() {
  return currentWeather;
}

loadWeather("Dresden");
findNow();
