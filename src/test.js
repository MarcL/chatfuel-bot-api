// Check if the lookup response contains ENOTFOUND or ENODATA - if so, it's not valid
const hasMxRecordError = error => {
    return error && (error.code === 'ENOTFOUND' || error.code === 'ENODATA');
};

// Perform an MX lookup - check if the DNS record exists
const findMxRecords = email => {
    return new Promise((resolve, reject) => {
        // Find the domain name from the email
        const [, domain] = email.split('@');

        // If we get a valid MX record response, it's a valid email
        dns.resolveMx(domain, (error, addresses) => {
            if (hasMxRecordError(error)) {
                reject(new Error('Email has invalid MX record'));
            } else {
                resolve(addresses);
            }
        });
    });
};

// Verify an email address
router.get('/email', (request, response) => {
    // Get email from the request query parameters
    const { email } = request.query;

    return isValidemail(email)
        .then(() => findMxRecords(email))
        .then(mxRecords => {
            return response.json({
                set_attributes: {
                    emailValid: true,
                },
            });
        })
        .catch(error => {
            return response.json({
                set_attributes: {
                    emailValid: false,
                    error: error.message,
                },
            });
        });
});