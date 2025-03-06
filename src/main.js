import "./style.scss";
import "./normalize.scss";
import { getDataFromAPI } from "./api";
import { updateCurrentWeather } from "./DomManipulation";

export let currentWeather = { data: null };

async function loadWeather(city) {
  let weatherData = await getDataFromAPI(city);
  currentWeather = weatherData;
  console.log("currentWeather ist", currentWeather);
}

export function getCurrentWeather() {
  return currentWeather;
}

loadWeather("Dresden");
updateCurrentWeather();
