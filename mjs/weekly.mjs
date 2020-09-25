const weekly = {
    // Get from noaa
    // "forecast": "https://api.weather.gov/gridpoints/FSD/128,105/forecast",

    // IN:
    // "gridId": "FSD",
    // "gridX": 128,
    // "gridY": 105,

    // OUT:

    // "periods": [
    //     {
    //         "number": 1,
    //         "name": "This Afternoon",
    //         "startTime": "2020-09-18T17:00:00-05:00",
    //         "endTime": "2020-09-18T18:00:00-05:00",
    //         "isDaytime": true,
    //         "temperature": 65,
    //         "temperatureUnit": "F",
    //         "temperatureTrend": null,
    //         "windSpeed": "10 mph",
    //         "windDirection": "SE",
    //         "icon": "https://api.weather.gov/icons/land/day/few?size=medium",
    //         "shortForecast": "Sunny",
    //         "detailedForecast": "Sunny, with a high near 65. Southeast wind around 10 mph."
    //     },
    //     {
    //         "number": 2,
    //         "name": "Tonight",
    //         "startTime": "2020-09-18T18:00:00-05:00",
    //         "endTime": "2020-09-19T06:00:00-05:00",
    //         "isDaytime": false,
    //         "temperature": 48,
    //         "temperatureUnit": "F",
    //         "temperatureTrend": null,
    //         "windSpeed": "10 mph",
    //         "windDirection": "SE",
    //         "icon": "https://api.weather.gov/icons/land/night/sct?size=medium",
    //         "shortForecast": "Partly Cloudy",
    //         "detailedForecast": "Partly cloudy, with a low around 48. Southeast wind around 10 mph."
    //     },
    //     {
    //         "number": 3,
    //         "name": "Saturday",
    //         "startTime": "2020-09-19T06:00:00-05:00",
    //         "endTime": "2020-09-19T18:00:00-05:00",
    //         "isDaytime": true,
    //         "temperature": 74,
    //         "temperatureUnit": "F",
    //         "temperatureTrend": null,
    //         "windSpeed": "10 to 20 mph",
    //         "windDirection": "SSE",
    //         "icon": "https://api.weather.gov/icons/land/day/sct?size=medium",
    //         "shortForecast": "Mostly Sunny",
    //         "detailedForecast": "Mostly sunny, with a high near 74. South southeast wind 10 to 20 mph, with gusts as high as 35 mph."
    //     },
    //     {
    //         "number": 4,
    //         "name": "Saturday Night",
    //         "startTime": "2020-09-19T18:00:00-05:00",
    //         "endTime": "2020-09-20T06:00:00-05:00",
    //         "isDaytime": false,
    //         "temperature": 58,
    //         "temperatureUnit": "F",
    //         "temperatureTrend": null,
    //         "windSpeed": "15 to 20 mph",
    //         "windDirection": "SSE",
    //         "icon": "https://api.weather.gov/icons/land/night/sct?size=medium",
    //         "shortForecast": "Partly Cloudy",
    //         "detailedForecast": "Partly cloudy, with a low around 58. South southeast wind 15 to 20 mph, with gusts as high as 30 mph."
    //     }
    // ]



    // set icons
    // weather.forecast[0].description_icon
    // weather.forecast[0].description_icon_extended



    // set weather obj

    // weather.forecast[0].weekday periods[0].name
    // weather.forecast[0].moon use periods[0].startTime

    // if(isDaytime){
    //     weather.forecast[0].max_temp = periods[0].temperature
    // }
    // if(!isDaytime){
    //     weather.orecast[0].min_temp = periods[0].temperature
    // }


    // weather.forecast[0].weather.description = periods[0].shortForecast
    // weather.forecast[0].weather.description_long = periods[0].detailedForecast
    
    // weather.forecast[0].wind_spd = periods[0].windSpeed
    // weather.forecast[0].wind_cdir = periods[0].windDirection

    

};


export { weekly };

