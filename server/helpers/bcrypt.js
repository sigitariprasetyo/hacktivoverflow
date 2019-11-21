const bcryptjs = require('bcryptjs')
const SALT = bcryptjs.genSaltSync(10)

function hashPassword(password) {
  return bcryptjs.hashSync(password, SALT)
}

function comparePassword(password, hashPassword) {
  return bcryptjs.compareSync(password, hashPassword)
}

module.exports = { hashPassword, comparePassword }