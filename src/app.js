const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();
const PORT = process.env.PORT || 7000;

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.get('/', (request, response) => {
    response.render('index', {
        title: 'Weather App',
        name: 'Subodh Pandey'
    });
});

app.get('/help', (request, response) => {
    response.render('help', {
        name: 'Subodh Pandey',
        title: 'Help Page'
    })
});

app.get('/weather', (request, response) => {
    if (! request.query.address){
        return response.send({
            Error: 'Please Provide an adddress to search'
        });
    }
    geocode(request.query.address, (error, data) => {
        if (error){
            return response.send({ error });
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error){
                return response.send({ error });
            }
            response.send({
                location: data.location,
                forecast: forecastData
            })
        })
    });
});

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About Page',
        name: 'Subodh Pandey'
    })
})

app.get('/help/*', (req, res) => {
    res.send('Help article not found',{
        name: 'Subodh Pandey'
    });
})

app.get('*', (request, response)=> {
    response.send('My 404 Page');
});

app.listen(PORT, () => {
    console.log('Server started '+ PORT);
});