import { TripSearcher } from './trip-searcher';
import { TripCardFactory } from './trip-card-factory';
import { TripHistory } from './trip-history';

import { validateDestination, validateDate } from './validation';

class TravelApp {
    constructor() {
        this._searcher = new TripSearcher();
        this._tripHistory = new TripHistory();
        this._searchedTrip = null;
    }

    async run() {
        this._initializeControls();

        this._loadTripHistory();

        this._initSearchHandler();
        this._initAddSearchedTripToHistoryHandler();
        this._initDeleteTripFromHistoryHandler();
    }

    _initializeControls() {
        this._searchResult = document.getElementById('current-search-result');
        this._searchHistory = document.getElementById('search-history');
        this._destinationInput = document.getElementById('search-location');
        this._dateInput = document.getElementById('search-date');

        this._initDateConstraints();
    }

    _initDateConstraints() {
        const dateNow = new Date();
        const dateInSixteenDays = new Date();
        dateInSixteenDays.setDate(dateNow.getDate() + 16); // weatherbit forecast is for 16 days only ;(
        this._dateInput.setAttribute('min', this._formatDate(dateNow));
        this._dateInput.setAttribute('max', this._formatDate(dateInSixteenDays));
    }

    _initSearchHandler() {
        document.getElementById('btn-search').addEventListener('click', async (ev) => {
            const destination = this._getDestination();
            const date = this._getDate();

            await this._onSearch(destination, date);
        });
    }

    _initAddSearchedTripToHistoryHandler() {
        this._searchResult.addEventListener('click', ev => {
            this._handleButtonClick(ev, () => {
                this._tripHistory.add(this._searchedTrip);
                this._searchedTrip = null;
                this._renderSearchedTripView(null);
                this._loadTripHistory();
            });
        }, true);
    }
    _initDeleteTripFromHistoryHandler() {
        this._searchHistory.addEventListener('click', ev => {
            this._handleButtonClick(ev, (id) => {
                this._tripHistory.delete(id);
                this._renderTripHistoryView(this._listHistoryTrips());
            });
        }, true);
    }

    _handleButtonClick(ev, action) {
        ev.preventDefault();

        const target = ev.target;
        if (target.tagName === 'SPAN' &&
            target.parentNode &&
            target.parentNode.tagName === 'BUTTON') {
            
            const id = target.parentNode.dataset['id'];

            action(id);
        }
    }

    _validate(destination, date) {
        this._validateDestination(destination);
        this._validateDate(date);
    }

    _validateDestination(destination) {
        const result = validateDestination(destination);
        if (result) {
            throw new Error(result);
        }
    }

    _validateDate(date) {
        const result = validateDate(date);
        if (result) {
            throw new Error(result);
        }
    }

    async _onSearch(destination, date) {
        this._validate(destination, date);

        const trip = await this._searcher.search(destination, date);
        this._searchedTrip = trip;
        this._renderSearchedTripView(trip);
    }

    _renderSearchedTripView(trip) {
        const searchCard = trip ? TripCardFactory.create(trip) : '';
        this._searchResult.innerHTML = searchCard;
    }

    _getDestination() {
        return this._destinationInput.value;
    }
    _getDate() {
        return this._dateInput.value;
    }

    _loadTripHistory() {
        const trips = this._listHistoryTrips();
        this._renderTripHistoryView(trips);
    }

    _listHistoryTrips() {
        return this._tripHistory.list().reverse();
    }
    
    _renderTripHistoryView(trips) {
        let tripHistoryContent = '';
        for (const trip of trips) {
            tripHistoryContent += TripCardFactory.create(trip);
        }
        this._searchHistory.innerHTML = tripHistoryContent;
    }
    
    // format YYYY-MM-DD
    _formatDate(d) {
        return d.getFullYear() + '-' + ('0' + (d.getMonth() +1 )).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
    }
}

export { TravelApp }