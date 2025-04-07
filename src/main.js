import "./style.scss";
import "./normalize.scss";
import { getDataFromAPI, getSearchResultsFromAPI } from "./api";
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
  renderSearchResults,
  listenOptionsParagraph,
  checkFavoritBtn,
  listenWeatherTileBox,
} from "./DomManipulation";
import { loadFromLocalStorage, saveToLocalStorage } from "./localStorage";

export let currentWeather = { data: null };
export let storedWeather = [];
export let searchedWeather = [];
const delayedInput = debounce(loadSearchResults, 1000);

export function loadStoredWeatherIDs() {
  let data = [];
  data = loadFromLocalStorage();
  storedWeather = data;
}

export async function loadMainPage() {
  renderLoadingScreen();
  clearBackground();
  await loadStoredWeatherIDs();
  await renderMainPage(storedWeather);
  //await renderSavedWeather(storedWeather);
  listenWeatherTileBox();
  addListenerToSearchBar();
  listenOptionsParagraph();
}

export async function loadDetailedWeatherPage(cityID, cityName) {
  renderLoadingScreen(cityName);

  let newWeatherData = await getDataFromAPI(cityID);
  currentWeather = newWeatherData;

  renderWeatherForecastPage();
  checkFavoritBtn(cityID);
  setBackground();
  renderCurrentWeather();
  renderHourlyForecast();
  renderDailyForecast();
  renderWeatherDetails();
  listenBackButton();
  listenFavoritButton(cityID);
}

export function getCurrentWeather() {
  return currentWeather;
}

export function saveCurrentWeather(cityID) {
  //console.log("storedWeather =", storedWeather);
  if (!storedWeather) {
    storedWeather = [cityID];
    //console.log("storedWeather2 =", storedWeather);
  } else {
    storedWeather.push(cityID);
  }
  saveToLocalStorage(storedWeather);
  //console.log("storedWeather3 =", storedWeather);
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

export function addListenerToSearchBar() {
  let inputFieldEl = document.querySelector(".search-bar");
  inputFieldEl.addEventListener("input", () => {
    delayedInput();
  });
}

export async function loadSearchResults() {
  let searchPhrase = "";
  searchPhrase = document.querySelector(".search-bar__input").value;
  //console.log("searchPhrase =", searchPhrase);

  let searchResults = await getSearchResultsFromAPI(searchPhrase);
  console.log("searchResults =", searchResults);
  searchedWeather = searchResults;
  console.log("searchedWeather =", searchedWeather);
  renderSearchResults(searchResults);
}

function debounce(callback, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, delay);
  };
}

//loadStoredWeatherIDs();
loadMainPage();
//loadDetailedWeatherPage("575184");
//loadDetailedWeatherPage("2801268");
