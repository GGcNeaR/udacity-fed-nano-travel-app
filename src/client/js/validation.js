const DestinationIsRequired = 'Destination is required!';
const DateIsRequired = 'Date is required';
const DateHasInvalidFormat = 'Date has invalid format';
const DateFormatRegex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;

function validateDestination(destination) {
    if  (!destination) {
        return DestinationIsRequired;
    }
}

function validateDate(date) {
    if (!date) {
        return DateIsRequired;
    } else if (!date.match(DateFormatRegex)) {
        return DateHasInvalidFormat;
    }
}

export { validateDestination, validateDate, DestinationIsRequired, DateIsRequired, DateHasInvalidFormat }