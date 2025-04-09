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
  renderSearchResults,
  listenOptionsParagraph,
  checkFavoritBtn,
  listenWeatherTileBox,
  listenClickAppEl,
  listenClickSearchBar,
} from "./DomManipulation";
import { loadFromLocalStorage, saveToLocalStorage } from "./localStorage";

export let currentWeather = { data: null };
export let storedWeather = [];
export let searchedWeather = [];
const delayedInput = debounce(loadSearchResults, 500);

function loadStoredWeatherIDs() {
  let data = [];
  data = loadFromLocalStorage();
  storedWeather = data;
}

export async function loadMainPage() {
  renderLoadingScreen();
  clearBackground();
  await loadStoredWeatherIDs();
  await renderMainPage(storedWeather);
  listenWeatherTileBox();
  addListenerToSearchBar();
  listenOptionsParagraph();
  listenClickSearchBar();
  listenClickAppEl();
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
  if (!storedWeather) {
    storedWeather = [cityID];
  } else {
    storedWeather.push(cityID);
  }
  saveToLocalStorage(storedWeather);
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

function addListenerToSearchBar() {
  let inputFieldEl = document.querySelector(".search-bar");
  inputFieldEl.addEventListener("input", () => {
    delayedInput();
  });
}

async function loadSearchResults() {
  let searchPhrase = "";
  searchPhrase = document.querySelector(".search-bar__input").value;

  let searchResults = await getSearchResultsFromAPI(searchPhrase);
  searchedWeather = searchResults;
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

loadMainPage();
