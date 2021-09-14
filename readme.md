# ![forecast.js logo](https://raw.githubusercontent.com/ajwarnick/forecast-js/master/logo/logo.png)

## Features

A small weather app using data from the [National Weather Service (NWS)](https://www.weather.gov)

## Description 

Using Vue for data binding this app provides both current data, forecast predictions, and weather map for a ZIP code in the United States. The data is obtained from the [National Weather Service (NWS)](https://www.weather.gov) which is supported through federal taxes dollars. This library is markup agnostic and simply provides an object you can inject into your design. 



## Usage

### Download & Installation

#### Using NPM

Use the [NPM](https://www.npmjs.com) package manager to install [forecast-js](https://www.npmjs.com/package/@warnick/forecast-js). For ----

```bash
npm install --save @warnick/forecast-js
```



#### Using UNPKG

Simply, include the CDN links in the head of your HTML. (See above for typical use).

```html
<script src="https://unpkg.com/@warnick/forecast-js/dist/js/forecast.min.js" defer></script>
<link rel="stylesheet" href="https://unpkg.com/@warnick/forecast-js/dist/css/forecast.css">
```

### Prerequisite 

Before you begin there are a few things you need.

##### First  (Load JS)

Import the library into the head of your `index.html` file. 

```html
<script src="https://unpkg.com/@warnick/forecast-js/dist/js/forecast.min.js" defer></script>
<link rel="stylesheet" href="https://unpkg.com/@warnick/forecast-js/dist/css/forecast.css">
<link rel="stylesheet" href="/style.css">
```

##### Second (HTML Necessities)

In the body of your HTML, everything should be within a `<div class="results" id="app">`

```html
<body>
  <div class="results" id="app">
    
  </div>
</body>
```

##### Third (ZIP Code)

To trigger the fetching of data you will need to use the input for ZIP code. 

```html
<input placeholder="Enter Your ZIP Code"  v-on:input="zip_trigger" name="name" id="zip" />
```



### Weather Object

#### Variables

There are six main categories of information: location, time, alerts, current, hourly, and forecast. Within each of these there are a myriad of pieces of data you can implement into your application. 



#### Location

This is based on the Zip Code entered in the input or retrieved from a browser cookie. This object contains: 



#### Icons



| Icon                                                         | Code         | Description                  |
| ------------------------------------------------------------ | ------------ | ---------------------------- |
| ![clear sky icon](https://raw.githubusercontent.com/ajwarnick/ART300_weather_base/master/img/01d.png) | skc          | Clear Sky                    |
| ![few clouds icon](https://raw.githubusercontent.com/ajwarnick/ART300_weather_base/master/img/02d.png) | few          | Few Clouds                   |
| ![scattered clouds icon](https://raw.githubusercontent.com/ajwarnick/ART300_weather_base/master/img/03d.png) | sct          | Scattered Clouds             |
| ![broken clouds icon](https://raw.githubusercontent.com/ajwarnick/ART300_weather_base/master/img/04d.png) | bkn          | Broken Clouds                |
| ![shower rain icon](https://raw.githubusercontent.com/ajwarnick/ART300_weather_base/master/img/09d.png) | rain_showers | Rain Showers                 |
| ![rain icon](https://raw.githubusercontent.com/ajwarnick/ART300_weather_base/master/img/10d.png) | rain         | Rain                         |
| ![thunderstorm icon](https://raw.githubusercontent.com/ajwarnick/ART300_weather_base/master/img/11d.png) | tsra         | Thunderstorm                 |
| ![snow icon](https://raw.githubusercontent.com/ajwarnick/ART300_weather_base/master/img/13d.png) | snow         | Snow                         |
| ![mist icon](https://raw.githubusercontent.com/ajwarnick/ART300_weather_base/master/img/50d.png) | fog          | Fog, Haze, <br />Smoke, Dust |

##### Complex Icons



###### Clear Sky / Sunny

| Icon Code | Description          |
| --------- | -------------------- |
| skc       | Fair/clear           |
| wind_skc  | Fair/clear and windy |
| hot       | Hot                  |



###### Clouds

| Icon Code | Description             |
| --------- | ----------------------- |
| few       | A few clouds            |
| sct       | Partly cloudy           |
| bkn       | Mostly cloudy           |
| ovc       | Overcast                |
| wind_few  | A few clouds and windy  |
| wind_sct  | Partly cloudy and windy |
| wind_bkn  | Mostly cloudy and windy |
| wind_ovc  | Overcast and windy      |

###### Rain

| Icon Code       | Description                     |
| --------------- | ------------------------------- |
| rain            | Rain                            |
| rain_showers_hi | Rain showers (high cloud cover) |
| rain_showers    | Rain showers (low cloud cover)  |



###### Thunderstorm

| Icon Code      | Description                       |
| -------------- | --------------------------------- |
| tsra           | Thunderstorm (high cloud cover)   |
| tsra_sct       | Thunderstorm (medium cloud cover) |
| tsra_hi        | Thunderstorm (low cloud cover)    |
| tornado        | Tornado                           |
| hurricane      | Hurricane conditions              |
| tropical_storm | Tropical storm conditions         |



###### Snow

| Icon Code  | Description        |
| ---------- | ------------------ |
| snow       | Snow               |
| rain_snow  | Rain/snow          |
| rain_sleet | Rain/sleet         |
| snow_sleet | Snow/sleet         |
| fzra       | Freezing rain      |
| rain_fzra  | Rain/freezing rain |
| snow_fzra  | Freezing rain/snow |
| sleet      | Sleet              |
| blizzard   | Blizzard           |
| cold       | Cold               |



###### Fog/Haze/Smoke

| Icon Code | Description |
| --------- | ----------- |
| fog       | Fog/mist    |
| haze      | Haze        |
| smoke     | Smoke       |
| dust      | Dust        |



### Exemples 

###### [Full exmaple](https://codesandbox.io/s/forecast-js-example-v201-in96t)

###### [Current Temp](https://codesandbox.io/s/forecast-js-temp-v201-8bts7)

###### [Display Icon](https://codesandbox.io/s/forecast-js-images-v201-wg57e)

###### [Forecast](https://codesandbox.io/s/forecast-js-temp-v201-8bts7)

## Changelog

#### [2.3.0] - 2021-09-15

##### Added

Added the city under the location object

Set default ZIP code with a data attribute:

```html
<body>
  <div class="results" id="app" data-default-zip="90210">
  </div>
</body>
```

Added Air Quality object under Current. 
```json
{
   "name":"PM2.5",
   "aqi":50,
   "range":1,
   "discription":"Good",
   "details":[
      {
         "name":"PM2.5",
         "aqi":50,
         "range":1,
         "discription":"Good"
      },
      {
         "name":"O3",
         "aqi":35,
         "range":1,
         "discription":"Good"
      }
   ]
}
```


##### Removed

removed the city variable replaced with location.city 

#### [2.2.0] - 2021-09-12

##### Changed

Moon has changed from .moon to be an object .moon.class is slug (i.e. "waxing-crescent-moon") and .moon.name is human readable (i.e. "Waxing Crescent Moon") this breaks past uses of moon 

##### Updated 

Update js-cookie to 3.0.1
Update rollup to 2.56.3
Update rollup-plugin-terser to 7.0.2
Update vue to  2.6.14
Update sunrise-sunset-js to 2.2.1

##### Removed

Expired dependancies:
Removed @rollup/plugin-replace
Removed dual-publish


#### [2.1.0] - 2021-03-31

##### Updated 

Fetch for zip api now used {mode:'cors'}

#### [2.0.4] - 2020-11-04

##### Added

weather.current.uv - UV index from the EPA's Envirofacts Data Service API  
weather.current.air_quality - Air quality information from EPA's airnow.gov   

#### [2.0.0] - 2020-09-19

##### Changed

Shifted all data to NWS

##### Removed 

 [OpenWeatherMap](https://openweathermap.org/api) and [Weatherbit](https://www.weatherbit.io/api) data  
Removed map and moved it to version 3

##### Depricated 

current.uv [Hopefully will return in v3]  
cuurrent.air_quality [Hopefully will return in v3]  
forecast[i].wind_cdir_full  
forecast[i].dewpt  
forecast[i].vis  
forecast[i].pop  
forecast[i].precip  
forecast[i].snow  
forecast[i].pres   

#### [1.6.0] - 2020-03-18

##### Changed

Time is now localized to the time at the zip code 

#### [1.5.0] - 2020-03-18

##### Added

Updated Readme

##### Changed

Fixed Mixed content (http/https) 


#### [1.4.0] - 2020-03-15

##### Added

Working map using [OpenLayers](https://openlayers.org)

#### [1.3.0] - 2020-02-14

##### Removed

Expired dependancies 



## TODO

#### v2.5

- ~~have students set default Zip Code and fill it to their id~~
- ~~get more info from NOA~~ 
- Solution for matching multiple icons
- ~~Add https://www.airnow.gov/?city=Manhattan&state=KS&country=USA~~
- ~~Fix day shift sunrise sunset~~

#### v3 

- Add other types of search 
- Add map back in 
- get mothods written by students and add those dynamically to the vue methods 
- Set User-Agent: (myweatherapp.com, contact@myweatherapp.com)


## Contributors 

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

- [Anthony Warnick](https://github.com/ajwarnick)



## License

This project is licensed under the MIT License