import { Moon } from "./moon.mjs";
import { icon } from "./icons.mjs";
import { Ute } from "./ute.mjs";
import { getSunrise, getSunset } from './sun.mjs';

const Current = {
  loaded: false,
  gridId: "",
  gridX: "",
  gridY: "",
  station: 0
};


Current.get = (gridId, gridX, gridY, station = 0) => {
  Current.gridId = gridId;
  Current.gridX = gridX;
  Current.gridY = gridY;
  Current.station = station;
  return fetch("https://api.weather.gov/gridpoints/" +
              gridId +
              "/" +
              gridX +
              "," +
              gridY +
              "/stations")
    .then((response) => response.json())
    .then((data)=>Current.getStation(data.features[station].properties.stationIdentifier))

}

Current.getStation = (station) => {
  return Current.getURL(
    "https://api.weather.gov/stations/" + station + "/observations/latest"
  );
};

Current.getURL = (url) => {
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        if(response.status){
          return Current.get(Current.gridId, Current.gridX, Current.gridY, Current.station + 1);
          // console.log(response.status)
          // return Promise.reject('some error happend maybe 404')
        }
        
      }
    })
    .then((json) => {
      return Current.makeForecast(json.properties, json.geometry);
    })
};

Current.makeForecast = (weather, geo) => {
  let c = {};
  
  // GEO
  let lat = geo.coordinates[1];
  let lon = geo.coordinates[0];

  // SUNRISE
  let sr = getSunrise(lat, lon, new Date());
  c.sunrise = {
    hour: sr.getHours(),
    minute: Ute.zeroPadding(sr.getMinutes(), 2),
    seconds: Ute.zeroPadding(sr.getSeconds(), 2),
    ampm:  sr.getHours() >= 12 ? 'pm' : 'am',
    time: sr.getHours() + ":" + Ute.zeroPadding(sr.getMinutes(), 2)
  }
  
  // SUNSET
  let ss = getSunset(lat, lon, new Date());
  c.sunset = {
    hour: Ute.to12Hours(ss.getHours()),
    minute: Ute.zeroPadding(ss.getMinutes(), 2),
    seconds: Ute.zeroPadding(ss.getSeconds(), 2),
    ampm:  Ute.to12Hours(ss.getHours()) >= 12 ? 'pm' : 'am',
    time: Ute.to12Hours(ss.getHours()) + ":" + Ute.zeroPadding(ss.getMinutes(), 2)
  }

  

  c.description_main = weather.textDescription;
  // c.description_long

  // c.description_icon is now c.icon
  c.icon = icon.filter(weather.icon);

  // TEMP
  c.temp = {
    current: Ute.celsiusToFahrenheit(weather.temperature.value),
    // high: ,
    // low: ,
    // feelslike: ,
    heatIndex: Ute.celsiusToFahrenheit(weather.heatIndex.value),
    windChill: Ute.celsiusToFahrenheit(weather.windChill.value),
    unit: "F"
  };

  // WIND
  c.wind = {
    speed: Math.round( Ute.kmPerHourToMiles(weather.windSpeed.value) ),
    gust: Ute.kmPerHourToMiles(weather.windGust.value),
    unit: "mph",
    angle: weather.windDirection.value,
    direction: Ute.degToCardinal(weather.windDirection.value)
  }

  // OLD
  // c.rain
  // c.snow
  // precipitationLastHour: Object
  // precipitationLast3Hours: Object
  // precipitationLast6Hours: Object
  // NOW
  c.precipitation = {
    lasthour: Ute.metersToInches(weather.precipitationLastHour.value),
    threehours: Ute.metersToInches(weather.precipitationLast3Hours.value),
    sixhours: Ute.metersToInches(weather.precipitationLast6Hours.value),
    unit: "in"
  };

  c.dewpoint = Ute.celsiusToFahrenheit(weather.dewpoint.value);

  c.pressure = {
    seaLevel: Ute.pascalToInchesH20(weather.seaLevelPressure.value),
    barometric: Ute.pascalToInchesH20(weather.barometricPressure.value),
    unit: "in"
  };

  c.visibility = Math.round(Ute.metersToMiles(weather.visibility.value));
  c.visibilityUnit = "mi";
  c.humidity = Math.round( weather.relativeHumidity.value );
  c.humidityUnit = weather.relativeHumidity.unitCode === "unit:percent" ? "%" : undefined;

  // c.cloud_cover

  return c;
};

export { Current };
