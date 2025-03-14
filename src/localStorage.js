export function saveToLocalStorage(weatherArr) {
  const JSONNWeather = JSON.stringify(weatherArr);
  localStorage.setItem("savedWeather", JSONNWeather);
}

export function loadFromLocalStorage() {
  const loadWeather = localStorage.getItem("savedWeather");
  const UnJSON = JSON.parse(loadWeather);
  return UnJSON;
}
