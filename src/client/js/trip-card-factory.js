class TripCardFactory {
    static create(tripModel) {
        return `<div class="card">
        <header>
            <h3>${tripModel.destination}, ${tripModel.country} - ${tripModel.date}</h3>
            <button class="btn btn-flat" data-id="${tripModel.id}"><span class="material-icons">${tripModel.isTransient ? 'playlist_add' : 'delete'}</span></button>
        </header>
        <section class="card-body">
            <img src="${tripModel.image.url}" alt="${tripModel.image.tags}">
            <p>
                <strong>Min. temp:</strong> ${tripModel.weather.minTemp} &#8451;<br>
                <strong>Max. temp:</strong> ${tripModel.weather.maxTemp} &#8451;<br>
                <strong>Wind speed:</strong> ${tripModel.weather.windSpeed} m/sec
            </p>
        </section>
    </div>`;
    }
}

export { TripCardFactory }