class TripModel {
    constructor(data) {
        this._id = data.id;
        this._date = data.date;
        this._country = data.country;
        this._destination = data.destination;
        this._image = data.image;
        this._coords = data.coords;
        this._weather = data.weather;
    }

    get id() { return this._id; }

    get date() { return this._date; }

    get daysLeft() {}

    get country() { return this._country; }

    get destination() { return this._destination; }

    get image() { return this._image; }

    get coords() { return this._coords; }

    get weather() { return this._weather; }

    get isTransient() { return !this._id; }

    // I just need to be able to identify new and old items and also be able to sort them.
    // Since I will keep them in LocalStorage, that's the easiest way that came to my mind ;)
    save() {
        if (!this._id) {
            this._id = Date.now();
        }
    }

    toJSON() {
        return {
            id: this.id,
            date: this.date,
            country: this.country,
            destination: this.destination,
            image: this.image,
            coords: this.coords,
            weather: this.weather
        };
    }

    static parseJson(data) {
        return new TripModel(data);
    }
}

export { TripModel }