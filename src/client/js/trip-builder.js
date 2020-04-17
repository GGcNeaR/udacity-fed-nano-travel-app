import { TripModel } from './trip-model';

class TripBuilder {
    constructor() {
        this._card = null;
    }

    forDestination(destination) {
        return this._setCardProp(card => card.destination = destination);
    }

    forDate(date) {
        return this._setCardProp(card => card.date = date);
    }

    inCountry(country) {
        return this._setCardProp(card => card.country = country);
    }
    
    withCoords(coords) {
        return this._setCardProp(card => card.coords = coords);
    }

    withImage(image) {
        return this._setCardProp(card => card.image = image);
    }

    withWeather(weatherData) {
        return this._setCardProp(card => { card.weather = weatherData });
    }

    build() {
        return new TripModel({
            date: this._card.date,
            country: this._card.country,
            destination: this._card.destination,
            coords: this._card.coords,
            image: this._card.image,
            weather: this._card.weather
        });
    }

    // helper methods cuz DRY
    _setCardProp(action) {
        this._ensureCard();

        action(this._card);

        return this;
    }

    _ensureCard() {
        if (!this._card) {
            this._card = {};
        }
    }
}

export { TripBuilder }