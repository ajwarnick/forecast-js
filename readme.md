# ![forecast.js logo](https://raw.githubusercontent.com/ajwarnick/forecast-js/master/logo/logo@2x.png)

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

### Installing

### Weather Object



#### Icons



### Exemples 



### Download & Installation

#### Using NPM

Use the [NPM](https://www.npmjs.com) package manager to install [forecast-js](https://www.npmjs.com/package/@warnick/forecast-js).

```bash
npm install --save @warnick/forecast-js
```

##### Include JS

Now you can include the modules in your JS or SCSS

```javascript

```



#### Using UNPKG

Simply, include the CDN links in the head of your HTML

```html
<script src="https://unpkg.com/@warnick/forecast-js/js/forecast.min.js" defer></script>
<link rel="stylesheet" href="https://unpkg.com/@warnick/forecast-js/css/forecast.css">
```





## Changelog

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