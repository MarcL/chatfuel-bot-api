// Simple check if it's an email - has it got an @ sign in it?
const isValidEmail = email => email && email.includes('@');

module.exports = isValidEmail;
