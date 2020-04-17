import validateQuery from './validate-query';

const mockedReqObj = {
    query: {
        id: 5
    }
};

test('query parameter "id" is present', () => {
    expect(validateQuery(mockedReqObj, 'id')).toBe(true);
});

test('query parameter "name" is missing', () => {
    expect(validateQuery(mockedReqObj, 'name')).toBe(false);
});