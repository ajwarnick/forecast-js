# ![forecast.js logo](https://raw.githubusercontent.com/ajwarnick/forecast-js/master/logo/logo.png)

## Features

A small weather app using data from the [National Weather Service (NWS)](https://www.weather.gov), [OpenWeatherMap](https://openweathermap.org), and [Weatherbit](https://www.weatherbit.io).

## Description 

Using Vue for data binding this app provides both current data, forecast predictions, and weather map for a ZIP code in the United States. For your application to work properly you will need to sign-up and get an API key for [OpenWeatherMap](https://openweathermap.org/api) and [Weatherbit](https://www.weatherbit.io/api). For Both of these services the library relies on the free level of API use. If your app become popular and you are making more than the allowed calls per day you will need to pay for each of these services. 

This library is markup agnostic and simply provides an object you can inject into your design. 



## Usage

### Prerequisite 

Before you begin there are a few things you need.

##### First (API Keys)

Create a file in the root of your application called `keys.js` this file should contain your API keys:

```javascript
var Keys = {
    openweathermap: "--------------------------------",
    weatherbit: "--------------------------------"
}
```

Replace the ----------- with your key for each of the services. And make sure `Keys` is capitalized. 

##### Second (Load JS)

Import the library into the head of your `index.html` file. 

```html
<script src="keys.js"></script>
<script src="https://unpkg.com/@warnick/forecast-js/js/forecast.min.js" defer></script>
<link rel="stylesheet" href="https://unpkg.com/@warnick/forecast-js/css/forecast.css">
<link rel="stylesheet" href="/style.css">
```

##### Third (HTML Necessities)

In the body of your HTML, everything should be within a `<div class="results" id="app">`

```html
<body>
  <div class="results" id="app">
    
  </div>
</body>
```



##### Fourth (ZIP Code)

To trigger the fetching of data you will need to use the input for ZIP code. 

```html
<input placeholder="Enter Your ZIP Code"  v-on:input="zip_trigger" name="name" id="zip" />
```





### Download & Installation

#### Using NPM

Use the [NPM](https://www.npmjs.com) package manager to install [forecast-js](https://www.npmjs.com/package/@warnick/forecast-js). For ----

```bash
npm install --save @warnick/forecast-js
```



#### Using UNPKG

Simply, include the CDN links in the head of your HTML. (See above for typical use).

```html
<script src="https://unpkg.com/@warnick/forecast-js/js/forecast.min.js" defer></script>
<link rel="stylesheet" href="https://unpkg.com/@warnick/forecast-js/css/forecast.css">
```



### Weather Object

#### Variables

There are six main categories of information: location, time, alerts, current, hourly, and forecast. Within each of these there are a myriad of pieces of data you can implement into your application. 



#### Location

This is based on the zip



 

#### Icons

The following icons are based on the codes and descriptions used by [OpenWeatherMap](https://openweathermap.org/weather-conditions). 

| Icon                                                         | Code | Description      |
| ------------------------------------------------------------ | ---- | ---------------- |
| ![clear sky icon](https://raw.githubusercontent.com/ajwarnick/ART300_weather_base/master/img/01d.png) | 01n  | clear sky        |
| ![few clouds icon](https://raw.githubusercontent.com/ajwarnick/ART300_weather_base/master/img/02d.png) | 02n  | few clouds       |
| ![scattered clouds icon](https://raw.githubusercontent.com/ajwarnick/ART300_weather_base/master/img/03d.png) | 03n  | scattered clouds |
| ![broken clouds icon](https://raw.githubusercontent.com/ajwarnick/ART300_weather_base/master/img/04d.png) | 04n  | broken clouds    |
| ![shower rain icon](https://raw.githubusercontent.com/ajwarnick/ART300_weather_base/master/img/09d.png) | 09n  | shower rain      |
| ![rain icon](https://raw.githubusercontent.com/ajwarnick/ART300_weather_base/master/img/10d.png) | 10n  | rain             |
| ![thunderstorm icon](https://raw.githubusercontent.com/ajwarnick/ART300_weather_base/master/img/11d.png) | 11n  | thunderstorm     |
| ![snow icon](https://raw.githubusercontent.com/ajwarnick/ART300_weather_base/master/img/13d.png) | 13n  | snow             |
| ![mist icon](https://raw.githubusercontent.com/ajwarnick/ART300_weather_base/master/img/50d.png) | 50n  | mist             |



### Exemples 

Full exmaple

https://codesandbox.io/s/forecast-js-example-959xr

Display Icon

Forecast



## Changelog

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



## Contributors 

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

- [Anthony Warnick](https://github.com/ajwarnick)



## License

This project is licensed under the MIT License