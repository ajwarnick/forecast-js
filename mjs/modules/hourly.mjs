import { Moon } from "./moon.mjs";
import { icon } from "./icons.mjs";

const Hourly = {
  loaded: false
};

Hourly.get = (gridId, gridX, gridY) => {
  return Hourly.getURL(
    "https://api.weather.gov/gridpoints/" +
      gridId +
      "/" +
      gridX +
      "," +
      gridY +
      "/forecast/hourly"
  );
};

Hourly.getURL = (url) => {
  return fetch(url) // return this promise
    .then((response) => response.json())
    .then((json) => json.properties.periods)
    .then((hours) => {
      return Hourly.makeForecast(hours);
    });
};

Hourly.makeForecast = (hours) => {
  // console.log(hours);
  let toReturn = [];
  hours.forEach((item) => {
    let hour = {};
    const date = new Date(item.startTime);
    hour.day = date.getDate();
    hour.month = date.getMonth() + 1;
    hour.year = date.getFullYear();

    hour.moon = Moon.simple(hour.year, hour.month, hour.day);

    hour.time = date.getHours() % 12;
    hour.time24 = date.getHours();
    hour.ampm = hour.time24 >= 12 ? "pm" : "am";

    hour.number = item.number;

    hour.startTime = item.startTime;
    hour.endTime = item.endTime;
    hour.isDaytime = item.isDaytime;
    hour.shortForecast = item.shortForecast;
    hour.detailedForecast = item.detailedForecast;
    hour.icon = icon.filter(item.icon);

    hour.windSpeed = item.windSpeed;
    hour.windDirection = item.windDirection;
    hour.temperature = item.temperature;
    hour.temperatureUnit = item.temperatureUnit;
    hour.temperatureTrend = item.temperatureTrend;

    toReturn.push(hour);
  });

  Hourly.loaded = true;
  return toReturn;
};

export { Hourly };
