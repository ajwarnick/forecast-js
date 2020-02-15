const Temp = {
    kelvinToFahrenheit: function(tempK) {
        // Convert from Kelvin to Fahrenheit
        //T(°F) = T(K) × 9/5 - 459.67
        let tempF = parseInt((tempK * 1.8) - 459.67, 10);
        return tempF;
    },
    
    celsiusToFahrenheit: function(tempC) {
        let tempF = parseInt((tempC * 1.8) + 32);
        return tempF;
    }
}

export { Temp };