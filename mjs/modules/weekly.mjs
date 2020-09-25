import { Moon } from "./moon.mjs";
import { icon } from "./icons.mjs";
import { getSunrise, getSunset } from "./sun.mjs";

const Weekly = {
  test: "test",
  loaded: false
};

Weekly.get = (gridId, gridX, gridY) => {
  // Get from noaa
  // "forecast": "https://api.weather.gov/gridpoints/FSD/128,105/forecast",

  return Weekly.getURL(
    "https://api.weather.gov/gridpoints/" +
      gridId +
      "/" +
      gridX +
      "," +
      gridY +
      "/forecast"
  );
};

Weekly.getURL = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      return Weekly.makeForecast(json.properties.periods, json.geometry.coordinates[0])
    });
};

Weekly.makeForecast = (days,geo) => {
  let toReturn = [];

  let lat = geo[0][1];
  let lon = geo[0][0];
  
  let d = days.filter((day) => day.isDaytime);

  d.forEach((item) => {
    let day = {};
    
    day.icon = icon.filter(item.icon);

    const date = new Date(item.startTime);

    day.day = date.getDate();
    day.month = date.getMonth() + 1;
    day.year = date.getFullYear();
    day.weekday = item.name;

    day.moon = Moon.simple(day.year, day.month, day.day);
    
    
    // SUNRISE
    day.SNRS = getSunrise(lat, lon, new Date(day.year, day.month-1, day.day));
    day.sunrise = (day.SNRS.getHours() % 12).toString() + ":" + day.SNRS.getMinutes().toString().padStart(2, "0");

    // SUNSET
    day.SNST = getSunset(lat, lon, new Date(day.year, day.month-1, day.day));
    day.sunset = (day.SNST.getHours() % 12).toString() + ":" + day.SNST.getMinutes().toString().padStart(2, "0");

    day.max_temp = item.temperature;
    day.temperatureUnit = item.temperatureUnit;

    let night = days[item.number];
    night ? (day.min_temp = night.temperature) : (day.min_temp = undefined);

    // Description
    day.weather = {
      description: item.shortForecast,
      description_long: item.detailedForecast
    };

    // Wind
    day.wind_spd = item.windSpeed;
    day.wind_cdir = item.windDirection;
    day.wind = {
      speed: item.windSpeed,
      direction: item.windDirection
    };

    // if(!isDaytime){
    //     weather.orecast[0].min_temp = periods[0].temperature
    // }

    toReturn.push(day);
  });

  Weekly.loaded = true;
  return toReturn;
};

export { Weekly };
