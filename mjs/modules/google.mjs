const Google = {
    key: ""
}

Google.getLatLon = function(zip){
    return fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + zip + "&key=" + Google.key + "&sensor=true")
        .then(response => response.json())
        .then(data => data.results[0])
        .then( zip => {
            const latitude = zip.geometry.location.lat;
            const longitude = zip.geometry.location.lng;
            return {latitude, longitude};
        })
}

export { Google };


// return Google.getLatLon(weather.location.zip)
// 	.then((data)=>{
// 		(debug) && (console.log("Latitude: " + data.latitude ));
// 		(debug) && (console.log("Longitude: " + data.longitude ));
        
// 		weather.location.coord.lat = data.latitude;
// 		weather.location.coord.lon = data.longitude;

// 		return {lat: weather.location.coord.lat, lon: weather.location.coord.lon};
// 	})