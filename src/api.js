export async function getDataFromAPI(query) {
  let data = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=94d50eafde424456a22180219250503&&lang=de&days=3&q=id:${query}`
  );
  let result = await data.json();
  return result;
}

export async function getSearchResultsFromAPI(query) {
  let data = await fetch(
    `https://api.weatherapi.com/v1/search.json?key=94d50eafde424456a22180219250503&&lang=de&q=${query}`
  );
  let result = await data.json();
  return result;
}
