
const Alerts = {
    test: "test"
}

Alerts.get = (lat, lon) => {
    return Alerts.getURL("https://api.weather.gov/alerts?active=true&point=" + lat + "," + lon);
}

Alerts.getURL = (url) => {
    return fetch(url)
        .then((response) => response.json())
        .then((json) => {
            return Alerts.formate(json)
        });
};

Alerts.formate = (alerts) => {
    let toReturn;
    let a = alerts.features;

    if( a ){
        if( a.length > 0 ){
            toReturn = [];
            a.forEach(function(element) {
                let alert = {
                    headline: element.properties.headline,
                    type: element.properties.event,
                    time_range: element.properties.effective,
                    expires: element.properties.expires,
                    instruction: element.properties.instruction,
                    description: element.properties.description,
                    certainty: element.properties.certainty,
                    severity: element.properties.severity,
                    banner_headline: element.properties.event
                    // banner_headline: element.properties.parameters.NWSheadline[0]
                }
    
                toReturn.push(alert);
            });	
        }
    }
    
    return toReturn;
}


export { Alerts };
