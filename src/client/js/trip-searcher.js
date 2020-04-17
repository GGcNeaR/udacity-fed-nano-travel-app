import { TripBuilder } from './trip-builder';

const ENDPOINT_BASE = 'http://localhost:8081';
const LOCATION_ENDPOINT = `${ENDPOINT_BASE}/location`;
const WEATHER_ENDPOINT = `${ENDPOINT_BASE}/forecast`;
const IMAGE_ENDPOINT = `${ENDPOINT_BASE}/image`;

class TripSearcher {
    async search(destination, date) {
        const builder = new TripBuilder();

        try {
            const location = await this._searchDestination(destination);
            if (!location || location.error) {
                throw new Error(`Location for ${destination} could not be found!`);
            }

            const { lng, lat } = location;
            const coords = { lng, lat };

            builder.forDate(date)
                .forDestination(location.name)
                .inCountry(location.country)
                .withCoords(coords);

            const weather = await this._searchWeather(coords, date);
            if (!weather || weather.error) {
                throw new Error(`Weather forecast for ${destination} on ${date} could not be found!`);
            }

            builder.withWeather(weather);

            let image = await this._searchImage(location.name, location.country);
            if (!image || image.error) {
                // fallback to notfound placeholder image
                image = {
                    url: '/media/notfound.png',
                    tags: 'not found'
                }
            }
            builder.withImage(image);
        } catch (err) {
            throw err;
        }

        return builder.build();
    }

    async _searchDestination(destination) {
        return fetch(`${LOCATION_ENDPOINT}?query=${destination}`).then(r => r.json());
    }

    async _searchWeather(coords, date) {
        return await fetch(`${WEATHER_ENDPOINT}?lat=${coords.lat}&lng=${coords.lng}`)
                        .then(r => r.json())
                        .then(forecasts => forecasts.find(f => f.datetime === date));
    }

    async _searchImage(destination, country) {
        return await fetch(`${IMAGE_ENDPOINT}?destination=${destination}&country=${country || ''}`).then(r => r.json());
    }
}

export { TripSearcher }