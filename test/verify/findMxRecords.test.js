const dns = require('dns');
const findMxRecords = require("../../src/verify/findMxRecords");

jest.mock('dns', () => ({
    promises: {
        resolveMx: jest.fn()
    }
}));

describe('findMxRecords', () => {
    it('should throw expected error if no email is passed', async () => {
        expect.assertions(1);

        const mxRecordsError = new TypeError('The name argument must be of type string. Received undefined');
        dns.promises.resolveMx.mockRejectedValue(mxRecordsError);

        const callFunction = async () => await findMxRecords();

        await expect(callFunction())
            .rejects.toThrow('Invalid MX record for domain: undefined');

    });

    it('should throw expected error if email address has invalid domain', async () => {
        expect.assertions(1);

        const mxRecordsError = new Error('queryMx ENOTFOUND asoidhgoshety89.com');
        mxRecordsError.code = 'ENOTFOUND';

        dns.promises.resolveMx.mockRejectedValue(mxRecordsError);

        const callFunction = async () => await findMxRecords('invalid@asoidhgoshety89.com');

        await expect(callFunction())
            .rejects.toThrow("Email doesn't have a valid domain: asoidhgoshety89.com");
    });

    it('should throw expected error if email address has a valid domain but no MX record', async () => {
        expect.assertions(1);

        const mxRecordsError = new Error('queryMx ENODATA gmail.co.uk');
        mxRecordsError.code = 'ENODATA';

        dns.promises.resolveMx.mockRejectedValue(mxRecordsError);

        const callFunction = async () => await findMxRecords('invalid@gmail.co.uk');

        await expect(callFunction())
            .rejects.toThrow('Email domain is valid but has no MX record so no email can be delivered: gmail.co.uk');
    });

    it('should return expected MX records if email address has a valid MX domain', async () => {
        expect.assertions(1);

        const validMxRecords = [
            {
                exchange: 'valid-mx-server.google.com',
                priority: 5
            },
            {
                exchange: 'valid-mx-server-2.google.com',
                priority: 10
            }
        ];

        dns.promises.resolveMx.mockResolvedValue(validMxRecords);

        await expect(findMxRecords('valid@gmail.com'))
            .resolves.toEqual(validMxRecords);
    });
});
