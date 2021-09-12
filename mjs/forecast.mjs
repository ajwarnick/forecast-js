import { Weekly } from "./modules/weekly.mjs";
import { Hourly } from "./modules/hourly.mjs";
import { Current } from "./modules/current.mjs";
import { Alerts } from "./modules/alerts.mjs";
import { Gridpoints } from "./modules/gridpoints.mjs";
import { Ute } from "./modules/ute.mjs";
import { Warnick } from "./modules/warnick.mjs";
import { Zip } from "./modules/zip.mjs";
import { Moon } from "./modules/moon.mjs";
import Cookies from './modules/js.cookie.min.mjs';
import { zipApi } from "./modules/zipapi.mjs";
import { uvApi } from "./modules/uv.mjs";
import { airApi } from "./modules/air.mjs";
/* VUE GETS BUDLED IN */
import Vue from '../node_modules/vue/dist/vue.esm.browser.min.js';
// const app = document.getElementById("app");


/* DEBUG SETTING */
let debug = false;

/* ZIP CODE VARIABLE */
let zip;

/* DEFAULT WEATHER OBJECT */
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
		moom: {
			name: "",
			class: ""
		},
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
		air_quality: {
			name: "name"
		},

		humidity: "",
		pressure:"",
		cloud_cover: "",
		uv: "",

		

		// air_quality: {
		// 	name:"",
		// 	aqi:"",
		// 	range:"",
		// 	discription:"",

		// 	details: [{
		// 		name:"",
		// 		aqi:"",
		// 		range:"",
		// 		discription:""
		// 	}, {
		// 		name:"",
		// 		aqi:"",
		// 		range:"",
		// 		discription:""
		// 	}, {
		// 		name:"",
		// 		aqi:"",
		// 		range:"",
		// 		discription:""
		// 	}]
		// },

		parcipitation: {
			rain: "",
			snow: "",
		},

		sunrise: "",
		sunset: "",
		moon_phase: ""
	},

	// make array
	alert: false,
	alerts: [
		
	],

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
		{ weather:"", moon:"" },
		{ weather:"", moon:"" },
		{ weather:"", moon:"" },
		{ weather:"", moon:"" },
		{ weather:"", moon:"" },
		{ weather:"", moon:"" },
		{ weather:"", moon:"" }
	],
	end: ""
}



window.onload = function() {

    Warnick.init();
    
    if( Ute.getURLparam('zip') ){
		(debug) && (console.log("URL: " + Ute.getURLparam('zip')));

        if( Zip.zipTest( Ute.getURLparam('zip') ) ){
            zip = Ute.getURLparam('zip');
            //set cookie
        }
    }

    if( Cookies.get('zip') && !zip){
		(debug) && (console.log("Cookie: " + Cookies.get('zip')));

        if( Zip.zipTest( Cookies.get('zip') ) ){
			zip = Cookies.get('zip');
        }
    }
	
	if( zip ){
		doit();
	}
	
    // let temp_z = getURLvars();
	// if(temp_z){
	// 	zip = temp_z
	// }
	// getCookies();
};


function doit(){
	weather.location.zip = zip;
	(debug) && (console.log("Timezone: " + Zip.timezone( weather.location.zip ) ));

	weather.time.timezone = Zip.timezone( weather.location.zip );

	Zip.getCityAndState(weather.location.zip)
		.then((value) => {
			weather.city = value.city;
			weather.location.name = value.city;
			weather.location.state = value.state;			
		})
		.then(() => {
			// return Google.getLatLon(weather.location.zip)
			// 	.then((data)=>{
			// 		(debug) && (console.log("Latitude: " + data.latitude ));
			// 		(debug) && (console.log("Longitude: " + data.longitude ));
					
			// 		weather.location.coord.lat = data.latitude;
			// 		weather.location.coord.lon = data.longitude;

			// 		return {lat: weather.location.coord.lat, lon: weather.location.coord.lon};
			// 	})


			return zipApi.get(weather.location.zip)
				.then(data => {
					weather.location.coord.lat = data.Lat;
					weather.location.coord.lon = data.Long;
					const cord = {
						lat: data.Lat,
						lon: data.Long
					}
					return cord
				})
			
		})
		.then((cord) => {
			/* GRID RETRIEVAL AND PARSING FUNCTIONS */
			return Gridpoints.get(cord.lat, cord.lon)
				.then((value) => {
					if(value){
						(debug) && (console.log("Gridpoints: " + value ));
						// console.log(Gridpoints.gridID);
						return value;
					}
				});
		})
		.then((v)=>{
			/* ALERTS RETRIEVAL AND PARSING FUNCTIONS */
			Alerts.get(weather.location.coord.lat, weather.location.coord.lon)
				.then((value) => {
					(debug) && (console.log("Alerts: No Alert." ));
					
					if(value){
						(debug) && (console.log("Alerts: " + console.log(value) ));

						if(value.length > 0 || debug){
							weather.alert = true;
							weather.alerts = value;
						}
					}
				});
			return v;
		})
		.then((v) => {
			
			/* WEATHER RETRIEVAL AND PARSING FUNCTIONS */

			// let week = weekly.get("FSD", 128, 105);
			// let week = weekly.getURL(
			//   "https://api.weather.gov/gridpoints/FSD/128,105/forecast"
			// );
			// week.then((value) => console.log(value));

			Weekly.getURL(Gridpoints.forecast)
				.then((value) => {
					if(value){
						(debug) && (console.log("Weekly: " + value));
						weather.forecast = value;
					}	
				});
			
			
			// let hours = hourly.get("FSD", 128, 105);
			// let hours = hourly.getURL(
			//   "https://api.weather.gov/gridpoints/FSD/128,105/forecast/hourly"
			// );
			// hours.then((value) => console.log(value));
			Hourly.getURL(Gridpoints.forecastHourly)
				.then((value) => { 
					if(value){
						(debug) && (console.log("Hourly: " + value ));
						weather.hourly = value;
					}
				});


			// let cw = current.get("KMML");
			// cw.then((value) => console.log(value));

			Current.get(Gridpoints.gridID, Gridpoints.gridX, Gridpoints.gridY, 0)
				.then((value) => {
					if(value){
						(debug) && (console.log("Current: " + value));
						weather.current = value
						return true;
					}
				})
				.then((value) => {
					uvApi.get(weather.location.zip)
						.then((uv) => {
							(debug) && (console.log("UV: " + uv));

							const time = Ute.zeroPadding(weather.time.hour_12, 2) + " " + weather.time.ampm.toUpperCase()
							let now = uv.find(hour => hour.DATE_TIME.includes(time));
							return now;
						})
						.then((now) => {
							weather.current.uv = now.UV_VALUE;
						});
					airApi.get(weather.location.zip)
						.then((air) => {
							(debug) && (console.log("Air Auality: " + air));
							let types = [];
							air.forEach( (item) => {
								types.push({
									name: item.ParameterName,
									aqi: item.AQI,
									range: item.Category.Number,
									discription: item.Category.Name
								});
							})

							return types;
						})
						.then((air) => {
							air.sort((a, b) => (a.aqi < b.aqi) ? 1 : -1);
							let airQuality = {}
							airQuality.name = air[0].name; 
							airQuality.aqi = air[0].aqi;
							airQuality.range = air[0].range;
							airQuality.discription = air[0].discription;
							airQuality.details = air;
							
							return airQuality;
						})
						.then((airObj) => {
							// weather.current.air_quality = airObj;
						});
				});

			// Current.get(Gridpoints.radarStation)
			// 	.then((value) => {
			// 		(debug) && (console.log("Current: " + value));
			// 		weather.current = value
			// 	});

			// Removes the loading class once the data has been added
			document.getElementById("app").classList.remove("loading");
		});
}




/* DATE FUNCTIONS */
var timerID = setInterval(updateTime, 1000);
updateTime();

function updateTime() {
    let week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
	let cd;

	if(weather.time.timezone){
		let offset = Zip.getTimezoneOffset(weather.time.timezone);
		cd = new Date();
		cd.setTime(cd.getTime() + cd.getTimezoneOffset() * 60 * 1000 /* convert to UTC */ + (/* UTC+Offset */ offset) * 60 * 60 * 1000);
	}else{
		cd = new Date();
	}

	weather.time.day = week[cd.getDay()];
	weather.time.ampm = cd.getHours() >= 12 ? 'pm' : 'am';
	weather.time.hour_24 = Ute.zeroPadding(cd.getHours(), 2);
	weather.time.hour_12 = weather.time.hour_24 % 12;
	weather.time.minute = Ute.zeroPadding(cd.getMinutes(), 2);
	weather.time.seconds = Ute.zeroPadding(cd.getSeconds(), 2);
	weather.time.date =  Ute.zeroPadding(cd.getFullYear(), 4) + '-' + Ute.zeroPadding(cd.getMonth()+1, 2) + '-' + Ute.zeroPadding(cd.getDate(), 2);
	weather.time.moom = Moon.simple( Ute.zeroPadding(cd.getFullYear(), 4), Ute.zeroPadding(cd.getMonth()+1, 2), Ute.zeroPadding(cd.getDate(), 2) );
};




const updateWeather = () => {

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
				weather.time.timezone = Zip.timezone( zip );
				Cookies.set('zip', zip);
				
				document.getElementById("app").classList.add("loading");
				doit();
            }
			
		},
		closeParent: function (el){
			console.log(el);
			el.target.parentNode.remove();
		}
	}
})




/* MAPSTUFF FOR FUTURE */

// // Importing OpenLayers 
// var load_ol = new Promise(function(resolve, reject) {
// 	// do a thing, possibly async, then…
// 	const oljs = document.createElement('script');
// 	oljs.setAttribute('src', 'https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.2.1/build/ol.js');
// 	oljs.onload = function(){
// 		resolve("Stuff worked!"); 
// 	};
// 	oljs.onerror = function(){
// 		reject(Error("It broke"));
// 	}
// 	document.head.appendChild(oljs);
// });
  
// load_ol.then(function () { 
	
// 	map = new ol.Map({
// 		target: 'map',
// 		layers: [
// 			new ol.layer.Tile({
// 				source: new ol.source.OSM()
// 			})
// 		],
// 		view: new ol.View({
// 			center: ol.proj.transform( [37.41, 8.82] , 'EPSG:4326', 'EPSG:3857'),
// 			zoom: 9
// 		})
// 	});

// 	var layer_cloud = new ol.layer.Tile({
// 		source: new ol.source.XYZ({
// 			// Replace this URL with a URL you generate. To generate an ID go to http://home.openweathermap.org/
// 			// and click "map editor" in the top right corner. Make sure you're registered!
// 			url: "https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid="+Keys.openweathermap
// 		})
// 	});
// 	var layer_precipitation = new ol.layer.Tile({
// 		source: new ol.source.XYZ({
// 			// Replace this URL with a URL you generate. To generate an ID go to http://home.openweathermap.org/
// 			// and click "map editor" in the top right corner. Make sure you're registered!
// 			url: "https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid="+Keys.openweathermap
// 		})
// 	});
// 	map.addLayer(layer_cloud);
// 	// map.addLayer(layer_precipitation);
	
// }).catch(function () { 
// 	console.log('OpenLayer Error'); 
// }); 


// window.boom = function(){
// 	console.log("BOOM!");
// 	map.getView().setCenter(ol.proj.transform([0, 0], 'EPSG:4326', 'EPSG:3857'));
//     map.getView().setZoom(5);
// }

// let map; 


// function updateMap( lat, lon ){
// 	map.getView().setCenter(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
//     map.getView().setZoom(9);
// }