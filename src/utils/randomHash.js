const crypto = require('crypto')

function generateHashedPassword(password, salt) {
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512')
  return hash.toString('hex')
}

module.exports = generateHashedPassword