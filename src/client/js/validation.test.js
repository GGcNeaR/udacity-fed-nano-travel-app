import { validateDate, validateDestination, DestinationIsRequired, DateHasInvalidFormat } from './validation';


test('validateDate - has valid date format', () => {
    expect(validateDate('2020-04-20')).toBe(undefined);
});

test('validateDate - has invalid date format', () => {
    expect(validateDate('20/04/2020')).toBe(DateHasInvalidFormat);
});

test('validateDestination - has missing destination', () => {
    expect(validateDestination()).toBe(DestinationIsRequired);
});