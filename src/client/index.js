import { TravelApp } from './js/app'

import { globalErrorHandler, globalRejectionHandler } from './js/error-handler';

import './styles/index.scss';

// At least one event listener should be exported - well... ok.
window.addEventListener('error', globalErrorHandler);
window.addEventListener('unhandledrejection', globalRejectionHandler);

const app = new TravelApp();
app.run();