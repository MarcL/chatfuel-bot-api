const attributesResponse = require('../../src/chatfuel/attributesResponse');

describe('Chatfuel: attributesResponse', () => {
    it('should return expected response when email is valid', () => {
        expect(attributesResponse()).toEqual({
            set_attributes: {
                emailValid: true
            }
        });
    });

    it('should return expected response when email is not valid', () => {
        expect(attributesResponse(false)).toEqual({
            set_attributes: {
                emailValid: false
            }
        });
    });

    it('should add additional attributes when passed', () => {
        const additionalAttributes = {
            aString: 'a string',
            aBoolean: true,
            aNumber: 101
        };

        expect(attributesResponse(true, additionalAttributes)).toEqual({
            set_attributes: {
                emailValid: true,
                aString: 'a string',
                aBoolean: true,
                aNumber: 101
            }
        });
    });
});
