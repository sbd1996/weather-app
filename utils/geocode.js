const request = require('request');
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3Vib2RocCIsImEiOiJjbDBjZWtxeHIwNXVmM2pzNDRkeDN4OXF2In0.TEMoXj3T1YZCUYfj7GXf1w&limit=1';
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        }else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    })
}
module.exports = geocode;