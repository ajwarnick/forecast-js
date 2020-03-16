// set time zone based on new zip code if entered or found
// forecast.js:306 GET https://api.weather.gov/gridpoints/TOP/148,47/forecast/hourly 404 |||||| when zip is 90210



import { Moon } from './moon.mjs';
//Moon.phase('2018', '01', '19');

import { Ute } from './ute.mjs';
// Ute.formatDate(date, format, utc) replaces with Ute.formatDate(date, format, utc)
// Ute.getDayOfWeek(date) 
// UTe.zeroPadding(num, digit)

import { Temp } from './temp.mjs';
import { Zip } from './zip.mjs';
// Add location search 


// import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js'
import Vue from '../node_modules/vue/dist/vue.esm.browser.js';
// import Cookies from 'https://cdn.jsdelivr.net/npm/js-cookie@beta/dist/js.cookie.min.mjs'
import Cookies from './js.cookie.min.mjs';

import { Warnick } from './warnick.mjs';



// Importing OpenLayers 
var load_ol = new Promise(function(resolve, reject) {
	// do a thing, possibly async, then…
	const oljs = document.createElement('script');
	oljs.setAttribute('src', 'https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.2.1/build/ol.js');
	oljs.onload = function(){
		resolve("Stuff worked!"); 
	};
	oljs.onerror = function(){
		reject(Error("It broke"));
	}
	document.head.appendChild(oljs);
});
  
load_ol.then(function () { 
	
	map = new ol.Map({
		target: 'map',
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM()
			})
		],
		view: new ol.View({
			center: ol.proj.transform( [37.41, 8.82] , 'EPSG:4326', 'EPSG:3857'),
			zoom: 9
		})
	});

	var layer_cloud = new ol.layer.Tile({
		source: new ol.source.XYZ({
			// Replace this URL with a URL you generate. To generate an ID go to http://home.openweathermap.org/
			// and click "map editor" in the top right corner. Make sure you're registered!
			url: "https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid="+Keys.openweathermap
		})
	});
	var layer_precipitation = new ol.layer.Tile({
		source: new ol.source.XYZ({
			// Replace this URL with a URL you generate. To generate an ID go to http://home.openweathermap.org/
			// and click "map editor" in the top right corner. Make sure you're registered!
			url: "https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid="+Keys.openweathermap
		})
	});
	map.addLayer(layer_cloud);
	// map.addLayer(layer_precipitation);
	
}).catch(function () { 
	console.log('OpenLayer Error'); 
}); 


window.boom = function(){
	console.log("BOOM!");
	map.getView().setCenter(ol.proj.transform([0, 0], 'EPSG:4326', 'EPSG:3857'));
    map.getView().setZoom(5);
}





/* ZIP CODE VARIABLE */
let zip;
let map; 


window.onload = function() {

    Warnick.init();
    
    if( Ute.getURLparam('zip') ){
		console.log("URL: " + Ute.getURLparam('zip'));

        if( Zip.zipTest( Ute.getURLparam('zip') ) ){
            zip = Ute.getURLparam('zip');
            //set cookie
            getCurrent(zip);
            getAltCurrent(zip);
            getForecast(zip);
        }
    }

    if( Cookies.get('zip') && !zip){
		console.log("Cookie: " + Cookies.get('zip'));

        if( Zip.zipTest( Cookies.get('zip') ) ){
            zip = Cookies.get('zip');
            getCurrent(zip);
            getAltCurrent(zip);
            getForecast(zip);
        }
    }
	
	if( zip ){
		// console.log("Timezone: " + Zip.timezone( zip ) );
		weather.time.timezone = Zip.timezone( zip );
	}
	
    // let temp_z = getURLvars();
	// if(temp_z){
	// 	zip = temp_z
	// }
	// getCookies();
};








var weather = {
	error: "",

    city: "",
	location: {
		zip: "",
		coord: {
			lat: "",
			lon: ""
		},
		name: "",
		state: ""
	},
	

	time:{
		day:"",
		date:"",
		hour_24:"",
		hour_12: "",
		minute:"",
		seconds:"",
		ampm:"",
		moom: "",
		timezone: ""
	},
	
	current: {
		description: {
			main: "",
			long: "",
			icon: "",
		},
		temp:{
			current: "",
			high: "",
			low: "",
			feelslike: "",
		},
		wind: {
			speed: "",
			degree: "",
			direction: ""	
		},

		humidity: "",
		pressure:"",
		cloud_cover: "",
		uv: "",
		air_quality: "",

		parcipitation: {
			rain: "",
			snow: "",
		},

		sunrise: "",
		sunset: "",
		moon_phase: ""
	},

	alerts: {
		type: "",
		time_range: "",
		expires: "",
		headline: "",
		instruction: "",
		description: "",
		certainty: "",
		severity: "",
		banner_headline: ""
	},

	hourly: [
		{},
		{},
		{},
		{},
		{},
		{},
		{},
		{},
		{},
		{},
		{},
		{},
	],

	forecast: [
		{ weather:"" },
		{ weather:"" },
		{ weather:"" },
		{ weather:"" },
		{ weather:"" },
		{ weather:"" },
		{ weather:"" }
	],
	end: ""
}

/* DATE FUNCTIONS */
var timerID = setInterval(updateTime, 1000);
updateTime();
function updateTime() {
    let week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
	// old version based on the computer time
	let cd = new Date();
	// new version based on zipcode provided
	// let cd = new Date().toLocaleString("en-US", {timeZone: Zip.timezone( zip )});


	weather.time.day = week[cd.getDay()];
	weather.time.ampm = weather.time.hour >= 12 ? 'am' : 'pm';
	weather.time.hour_24 = Ute.zeroPadding(cd.getHours(), 2);
	weather.time.hour_12 = weather.time.hour_24 % 12;
	weather.time.minute = Ute.zeroPadding(cd.getMinutes(), 2);
	weather.time.seconds = Ute.zeroPadding(cd.getSeconds(), 2);
	weather.time.date =  Ute.zeroPadding(cd.getFullYear(), 4) + '-' + Ute.zeroPadding(cd.getMonth()+1, 2) + '-' + Ute.zeroPadding(cd.getDate(), 2);
	weather.time.moom = Moon.simple( Ute.zeroPadding(cd.getFullYear(), 4), Ute.zeroPadding(cd.getMonth()+1, 2), Ute.zeroPadding(cd.getDate(), 2) );
};
    






/* WEATHER RETRIEVAL AND PARSING FUNCTIONS */

function getCurrent(z) {
    let toFetchCurrent = "https://api.openweathermap.org/data/2.5/weather?zip=" + z + ",us&appid=" + Keys.openweathermap;
	
	fetch(toFetchCurrent)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
			mapCurrentResultsToState(myJson);
			if(myJson.coord.lat !== undefined && myJson.coord.lon !== undefined){
				getHourlyForcast( myJson.coord.lat, myJson.coord.lon );
                getCurrentUV( myJson.coord.lat, myJson.coord.lon );
				getAlerts( myJson.coord.lat, myJson.coord.lon );
				updateMap( myJson.coord.lat, myJson.coord.lon );
				// destroyMap();
				// my_initMap( myJson.coord.lat, myJson.coord.lon, 9 );
			}
        });

    
}

function mapCurrentResultsToState(j) {

	if (j.cod == "404" || j.cod == "401" ) {
		weather.error = j.message;
    } else {
		weather.location.name = j.name;
		weather.city = j.name;
		weather.location.coord = j.coord;
		weather.current.description_main = j.weather[0].main;
		weather.current.description_long = j.weather[0].description;
		weather.current.description_icon = j.weather[0].icon;
		weather.current.temp.current = Temp.kelvinToFahrenheit(j.main.temp);
		weather.current.temp.high = Temp.kelvinToFahrenheit(j.main.temp_max);
		weather.current.temp.low = Temp.kelvinToFahrenheit(j.main.temp_min);

		weather.current.pressure = j.main.pressure;
		weather.current.humidity= j.main.humidity;
	
		weather.current.wind.speed = j.wind.speed + "mph";
		weather.current.wind.degree = j.wind.deg;
		weather.current.cloud_cover = j.clouds.all;
		
		var sunrise = new Date(j.sys.sunrise*1000);
		weather.current.sunrise = Ute.formatDate(sunrise, "h:mmtt");

		var sunset = new Date(j.sys.sunset*1000);
		weather.current.sunset = Ute.formatDate(sunset, "h:mmtt");
	}

}

function getAltCurrent(zip){
	let toFetchAltCurrent = "https://api.weatherbit.io/v2.0/current?&postal_code="+zip+"&country=US&key="+Keys.weatherbit;

	fetch(toFetchAltCurrent)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
			weather.current.temp.feelslike = Temp.celsiusToFahrenheit(myJson.data[0].app_temp);
			weather.current.air_quality = myJson.data[0].aqi;
        });
}



function getForecast(z) {
	let toFetchForecast = "https://api.weatherbit.io/v2.0/forecast/daily?postal_code=" + z + "&country=US&units=I&key="+Keys.weatherbit;

	fetch(toFetchForecast,{
		method: 'GET',
		mode: "cors",
		headers: { 'Content-Type': 'application/json' }
	}).then(function (response) {
			return response.json();
		}).then(function (myJson) {
			mapForecastResultsToState(myJson);
		});
}

function mapForecastResultsToState(j) {
	if (j.cod == "404" || j.cod == "401" ) {
		weather.error = j.message;
    } else {
		weather.forecast = [];
		j.data.forEach(function(element) {
            element['weekday'] = Ute.getDayOfWeek(element.datetime);
            // Forecast Moon
            let d = element.datetime.split("-");
			if(d){
                element['moon'] = Moon.simple( d[0], d[1], d[2] );
            }
            
			// set icon 
			if( element.weather.code == '800' ){
				element['description_icon'] = "01d";
			}else if( element.weather.code == '801' ){
				element['description_icon'] = "02d";
			}else if( element.weather.code == '802' ){
				element['description_icon'] = "03d";
			}else if( element.weather.code == '803' || element.weather.code == '804'  ){
				element['description_icon'] = "04d";
			}else if( element.weather.code == '300' || element.weather.code == '301' || element.weather.code == '302'  ){
				element['description_icon'] = "09d";
			}else if( element.weather.code == '500' || element.weather.code == '501' || element.weather.code == '511' || element.weather.code == '520' || element.weather.code == '521' || element.weather.code == '522' || element.weather.code == '900' ){
				element['description_icon'] = "10d";
			}else if( element.weather.code == '200' || element.weather.code == '201' || element.weather.code == '202' || element.weather.code == '230' || element.weather.code == '231' || element.weather.code == '232' || element.weather.code == '233' ){
				element['description_icon'] = "11d";
			}else if( element.weather.code == '600' || element.weather.code == '601' || element.weather.code == '602' || element.weather.code == '610' || element.weather.code == '611' || element.weather.code == '612' || element.weather.code == '621' || element.weather.code == '622' || element.weather.code == '623' ){
				element['description_icon'] = "13d";
			}else if( element.weather.code == '700' || element.weather.code == '711' || element.weather.code == '721' || element.weather.code == '731' || element.weather.code == '741' || element.weather.code == '751' ){
				element['description_icon'] = "50d";
			}

			weather.forecast.push(element);
			weather.location.state = j.state_code;

		});
    }
}



function getHourlyForcast( lat, lon ){
	// let toFetch = "https://api.weather.gov/points/" + lat + "," + lon;
	let toFetch = "https://api.weather.gov/points/" + lat + "," + lon + "/forecast/hourly";
	let gridURL = fetch(toFetch)
		.then(function(response) {
			return response.url;
		})
		.then(function(url){
			return fetch(url);
		}).then(function(response) {
			return response.json();
		})
		.catch(function(error) {
			console.log('Request failed', error)
		})

	gridURL.then(function(r) {
		weather.hourly = r.properties.periods;
		weather.hourly.forEach(function(element) {
			var d = new Date(element.startTime);
			element['time'] = Ute.formatDate(d, "h:mmtt");
		});
	});
}

function getAlerts( lat, lon ){
	// https://api.weather.gov/alerts?active=true&point=44.45,-95.78
	let toFetch = "https://api.weather.gov/alerts?active=true&point=" + lat + "," + lon;

    fetch(toFetch)
    .then(function(response) {
        return response.json();
    }).then(function(myJson) {
		let a = myJson.features;
		if( a.length > 0 ){
			weather.alerts = []	
			a.forEach(function(element) {
				let alert = {}

				alert['type'] = element.properties.event;
				alert['time_range'] = element.properties.effective;
				alert['expires'] = element.properties.expires;
				alert['headline'] = element.properties.headline;
				alert['instruction'] = element.properties.instruction;
				alert['description'] = element.properties.description;
				alert['certainty'] = element.properties.certainty;
				alert['severity'] = element.properties.severity;
				alert['banner_headline'] = element.properties.parameters.NWSheadline[0];

				weather.alerts.push(alert);
			});	
		}
    })
}

function updateMap( lat, lon ){
	map.getView().setCenter(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
    map.getView().setZoom(9);
}

function getCurrentUV( lat, lon ){
	let toFetch = "http://api.openweathermap.org/data/2.5/uvi?appid=" + Keys.openweathermap + "&lat=" + lat + "&lon=" + lon;

	fetch(toFetch)
    .then(function(response) {
		return response.json();
    })
    .then(function(myJson) {
        weather.current.uv = myJson.value;
    })
}


/* VUE DATA BINDING */
Vue.config.productionTip = false;
Vue.config.devtools=false;

var vm = new Vue({
	el: '#app',
	data: weather,
	methods: {
		zip_trigger: function (el){

            if( Zip.zipTest(el.target.value) ){
                document.getElementById('zip').blur();
                zip = Zip.zipTest(el.target.value);
                Cookies.set('zip', zip);

                getCurrent(zip);
                getAltCurrent(zip);
                getForecast(zip);
            }
			
		},
		closeParent: function (el){
			console.log(el);
			el.target.parentNode.remove();

		}
	}
})
