const dotenv = require('dotenv');
dotenv.config();

const axios = require('axios');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile('dist/index.html');
});

const validateQuery = require('./validate-query');

app.get('/forecast', async (req, res) => {
    if (!validateQuery(req, 'lat', 'lng')) {
        return res.status(400).json({ error: 'Missing coords' });
    }

    const { lat, lng } = req.query;

    try {
        const data = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${process.env.WEATHERBIT_API_KEY}`);

        const firstResult = data.data.data; // dataception, we must go deeper :O
        if (!firstResult) {
           return res.status(404).json({ error: 'Not Found!' });
        }

        const forecasts = firstResult.map(f => {
            return {
                datetime: f.valid_date,
                maxTemp: f.max_temp,
                minTemp: f.min_temp,
                windSpeed: f.wind_spd
            };
        });

        return res.json(forecasts);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error });
    }
});

app.get('/location', async (req, res) => {
    if (!validateQuery(req, 'query')) {
        return res.status(400).json({ error: 'Empty search' });
    }

    const query = req.query.query;

    try {
        const data = await axios.get(`http://api.geonames.org/searchJSON?q=${query}&maxRows=1&orderby=relevance&username=${process.env.GEONAMES_ACCOUNT}`);

        const firstResult = data.data.geonames[0];
        if (!firstResult) {
           return res.status(404).json({ error: 'Not Found!' });
        }

        return res.json({
            name: firstResult.name,
            country: firstResult.countryName,
            lng: firstResult.lng,
            lat: firstResult.lat
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error });
    }
});

app.get('/image', async (req, res) => {
    if (!validateQuery(req, 'destination')) {
        return res.status(400).json({ error: 'Empty search' });
    }

    const destination = req.query.destination;
    const country = req.query.country;

    try {
        let data = await axios.get(`https://pixabay.com/api/?q=${destination}&image_type=photo&per_page=3&key=${process.env.PIXABAY_API_KEY}`);

        let firstResult = data.data.hits[0];
        if (!firstResult && country) {
            // fallback to country image search
            data = await axios.get(`https://pixabay.com/api/?q=${country}&image_type=photo&per_page=3&key=${process.env.PIXABAY_API_KEY}`);
            firstResult = data.data.hits[0];
        }

        if (!firstResult) {
            return res.status(404).json({ error: 'Not Found!' });
        }

        return res.json({
            previewURL: firstResult.previewURL,
            url: firstResult.largeImageURL,
            width: firstResult.imageWidth,
            height: firstResult.imageHeight,
            tags: firstResult.tags
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error });
    }
});

app.listen(8081, _ => {
    console.log('App listening on port 8081!');
});