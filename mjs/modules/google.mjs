const Google = {
    key: "AIzaSyChHOgRFmBo2TZS6A6nQqDvXQ2uYegN0gg"
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