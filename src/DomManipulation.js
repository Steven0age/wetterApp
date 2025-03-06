import { currentWeather, getCurrentWeather } from "./main";

let currentWeatherEl = document.querySelector(".current-weather");

export function updateCurrentWeather() {
  data = getCurrentWeather();
  currentWeatherEl.innerHTML = `
  <p class="current-weather__city">${data.location.name}</p>
        <p class="current-weather__temperature">7°</p>
        <p class="current-weather__condition">Klar</p>
        <p class="current-weather__top-bottom-temp">H:10° T:1°</p>`;
}
