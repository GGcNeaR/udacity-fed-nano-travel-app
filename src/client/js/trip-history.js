class TripHistory {
    constructor () {
        this._storageKey = 'trip-history-key';
    }

    add(trip) {
        this._add(trip);
    }

    delete(id) {
        this._delete(id);
    }

    list() {
        return this._load();
    }

    _add(trip) {
        trip.save();

        const trips = this._load();
        trips.push(trip);
        this._store(trips);
    }

    _delete(id) {
        const trips = this._load();
        const tripIdx = trips.findIndex(t => t.id == id);
        if (tripIdx !== -1) {
            trips.splice(tripIdx, 1);
            this._store(trips);
        }
    }

    _load() {
        const tripsValue = localStorage.getItem(this._storageKey) || '[]';
        const trips = JSON.parse(tripsValue);
        return this._sort(trips);
    }
    _store(trips) {
        trips = this._sort(trips);
        const tripsValue = JSON.stringify(trips);
        localStorage.setItem(this._storageKey, tripsValue);
    }

    _sort(trips) {
        return trips.sort((a, b) => a.id - b.id);
    }
}

export { TripHistory }