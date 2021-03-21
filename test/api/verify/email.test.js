const verifyEmail = require('../../../api/verify/email');
const findMxRecords = require('../../../src/verify/findMxRecords');

jest.mock('../../../src/verify/findMxRecords');

describe('API verify email', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return expected response if no email query is passed', async () => {
        expect.assertions(1);

        const fakeRequest = {
            query: {}
        };
        const fakeResponse = {
            json: jest.fn()
        };

        await verifyEmail(fakeRequest, fakeResponse);

        expect(fakeResponse.json).toHaveBeenCalledWith({
            set_attributes: {
                emailValid: false,
                error: 'No email provided'
            }
        });
    });

    it('should return expected response if email in query is invalid', async () => {
        expect.assertions(1);

        const fakeRequest = {
            query: {
                email: 'invalidEmailFormat'
            }
        };
        const fakeResponse = {
            json: jest.fn()
        };

        await verifyEmail(fakeRequest, fakeResponse);

        expect(fakeResponse.json).toHaveBeenCalledWith({
            set_attributes: {
                emailValid: false,
                error: 'Invalid email address format: invalidEmailFormat'
            }
        });
    });

    it('should return expected response if email in query is valid and has an MX record', async () => {
        expect.assertions(1);

        const fakeRequest = {
            query: {
                email: 'valid@gmail.com'
            }
        };
        const fakeResponse = {
            json: jest.fn()
        };

        findMxRecords.mockResolvedValue([{
            exchange: 'valid-mx-server.google.com',
            priority: 5
        }]);

        await verifyEmail(fakeRequest, fakeResponse);

        expect(fakeResponse.json).toHaveBeenCalledWith({
            set_attributes: {
                emailValid: true
            }
        });
    });

    it('should return expected response if email in query is valid but has an invalid MX record', async () => {
        expect.assertions(1);

        const fakeRequest = {
            query: {
                email: 'valid@gmail.com'
            }
        };
        const fakeResponse = {
            json: jest.fn()
        };

        findMxRecords.mockRejectedValue(new Error('Invalid MX record'));

        await verifyEmail(fakeRequest, fakeResponse);

        expect(fakeResponse.json).toHaveBeenCalledWith({
            set_attributes: {
                emailValid: false,
                error: 'Invalid MX record'
            }
        });
    });
});
