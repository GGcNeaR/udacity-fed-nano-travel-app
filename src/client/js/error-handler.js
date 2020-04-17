function globalErrorHandler(ev) {
    alert(ev.error.message);
}

function globalRejectionHandler(ev) {
    alert(ev.reason.message);
}

export { globalErrorHandler, globalRejectionHandler }