const Gridpoints = {
    set: false,
    gridID: "", 
    gridX: "", 
    gridY: "",
    county: "",
    cwa: "",
    fireWeatherZone: "",
    forecast: "",
    forecastGridData: "",
    forecastHourly: "",
    forecastOffice: "",
    forecastZone: "",
    relativeLocation: {
        city: "",
        state: ""
    },
    timeZone: "",
    observationStations: "",
    radarStation: ""
}

Gridpoints.get = (lat,lon) => {
    return Gridpoints.getURL("https://api.weather.gov/points/" + lat + "," + lon);
}

Gridpoints.getURL = (url) => {
    return fetch(url)
        .then((response) => response.json())
        .then((data) => {
            Gridpoints.gridID = data.properties.gridId;
            Gridpoints.gridX = data.properties.gridX;
            Gridpoints.gridY = data.properties.gridY;
            Gridpoints.county = data.properties.county;
            Gridpoints.cwa = data.properties.cwa;
            Gridpoints.fireWeatherZone = data.properties.fireWeatherZone;
            Gridpoints.forecast = data.properties.forecast;
            Gridpoints.forecastGridData = data.properties.forecastGridData;
            Gridpoints.forecastHourly = data.properties.forecastHourly;
            Gridpoints.forecastOffice = data.properties.forecastOffice;
            Gridpoints.forecastZone = data.properties.forecastZone;

            Gridpoints.relativeLocation = {
                city: data.properties.city,
                state: data.properties.state
            };

            Gridpoints.timeZone = data.properties.timeZone;
            Gridpoints.observationStations = data.properties.observationStations;
            Gridpoints.radarStation = data.properties.radarStation;

            Gridpoints.set = true;
            return Gridpoints.set;
        });
}

export {Gridpoints};