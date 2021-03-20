const attributesResponse = (emailValid = true, attributes = {}) => {
    return {
        set_attributes: {
            emailValid,
            ...attributes
        }
    };
};

module.exports = attributesResponse;
