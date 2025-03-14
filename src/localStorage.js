export function saveToLocalStorage(cityID) {
  let savedWeather = [cityID];
  const JSONNWeather = JSON.stringify(savedWeather);
  localStorage.setItem("savedWeather", JSONNWeather);
}

export function loadFromLocalStorage() {
  const loadWeather = localStorage.getItem("savedWeather");
  const UnJSON = JSON.parse(loadWeather);
  return UnJSON;
}
