const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');

app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, '../templates/views'));

hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.get('', (req, res) => {
    res.render('index');
});

app.get('/help', (req, res) => {
    res.render('help', {
        pageName: 'Helper Page'
    });
});

app.get('*', (req, res) => {
    res.send('My 404 Page');
})

app.listen(8097, () => {
    console.log('Server started at 8097');
})