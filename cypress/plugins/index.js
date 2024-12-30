const { authenticator } = require('otplib');

module.exports = (on, config) => {
  on('task', {
    log(message) {
      console.log(message)
      return null
    },
    generateOTP: (secret) => {
      return authenticator.generate(secret);
    },
  })
}