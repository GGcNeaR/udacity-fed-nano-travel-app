# Travel App by Borislav Borisov

The Travel App lets you prepare for your trips by searching destinations and their weather forecast in the next 16 days. You can then save the search result in your 'trip history' (_using localStorage - my extra mile_).

## Setup
You will need a `.env` file on your root level folder with valid API credentials:
```
GEONAMES_ACCOUNT=
WEATHERBIT_API_KEY=
PIXABAY_API_KEY=
```

## Commands

Restore packages:
```
npm install
```

Run webpack dev server:
```
npm run dev
```

_Note: you still need to run your backend (on port 8081)_

Build for production:
```
npm run build
```

Run in production mode:
```
npm run start
```

Execute tests:
```
npm run test
```