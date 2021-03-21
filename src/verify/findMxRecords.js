const {resolveMx} = require('dns').promises;

// Perform an MX lookup - check if the DNS record exists
const findMxRecords = async (email = '') => {
    const [, domain] = email.split('@');

    try {
        const addresses = await resolveMx(domain);
    
        return addresses;
    } catch(error) {
        if (error.code === 'ENOTFOUND') {
            throw new Error(`Email doesn't have a valid domain: ${domain}`);
        }

        if (error.code === 'ENODATA') {
            throw new Error(`Email domain is valid but has no MX record so no email can be delivered: ${domain}`);
        }

        throw new Error(`Invalid MX record for domain: ${domain}`);
    }
};

module.exports = findMxRecords;
