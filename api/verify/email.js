const isValidEmail = require('../../src/verify/isValidEmail');
const findMxRecords = require('../../src/verify/findMxRecords');
const attributesResponse = require('../../src/chatfuel/attributesResponse');

module.exports = async (request, response) => {
    const { email } = request.query;

    if (!email) {
        return response.json(attributesResponse(false, {
            error: 'No email provided'
        }));
    }

    const isValid = isValidEmail(email);
    if (isValid) {
        try {
            await findMxRecords(email);
            response.json(attributesResponse(true));
        } catch(error) {
            response.json(attributesResponse(false, {
                error: error.message,
            }));
        }
    } else {
        response.json(attributesResponse(false, {
            error: `Invalid email address format: ${email}`
        }));
    }
};
