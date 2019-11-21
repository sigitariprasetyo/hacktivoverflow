const User = require('../models/user')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')

class UserController {
  static register(req, res, next) {
    let { username, email, password } = req.body
    User.create({ username, email, password })
      .then(user => {
        let token = generateToken({ id: user._id })
        res.status(201).json({
          username: user.username,
          token
        })
      })
      .catch(next)
  }

  static login(req, res, next) {
    let { identity, password } = req.body
    User.findOne({ $or: [{ username: identity }, { email: identity }] })
      .then(user => {
        if (user && comparePassword(password, user.password)) {
          let token = generateToken({ id: user._id })
          res.status(200).json({
            username: user.username,
            token
          })
        } else {
          next({ status: 401, msg: `Wrong Username / Email/ Password` })
        }
      })
      .catch(next)
  }
}

module.exports = UserController