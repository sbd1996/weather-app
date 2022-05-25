const axios = require("axios");
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (lat, long, callback) => {
    const options = {
        method: 'GET',
        url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly',
        params: {lat: lat, lon: long},
        headers: {
          'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
          'X-RapidAPI-Key': '5e8acab072mshc5a9a9c4d869932p10b0d9jsne361bde202f5'
        }
    };
    axios.request(options).then(function (response) {
        console.log('It is going to be '+response.data.data[0].weather.description + ' and temprature will be '+ response.data.data[0].temp);
        callback(undefined, response.data.data[0])
    }).catch(function (error) {
        callback(error, undefined)
    });
}
module.exports = forecast