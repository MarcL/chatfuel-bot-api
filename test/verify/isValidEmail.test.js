const isValidEmail = require('../../src/verify/isValidEmail');

describe('isValidEmail', () => {
    it('should be falsy if no email is passed', () => {
        expect(isValidEmail()).toBeFalsy();
    });

    it('should return false if an invalid email is passed', () => {
        expect(isValidEmail('notanemail')).toBe(false);
    });

    it('should return true if a valid email is passed', () => {
        expect(isValidEmail('valid@email.com')).toBe(true);
    });
});
