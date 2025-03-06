export async function getDataFromAPI(query) {
  let data = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=94d50eafde424456a22180219250503&q=${query}`
  );
  let result = await data.json();
  return result;
}
