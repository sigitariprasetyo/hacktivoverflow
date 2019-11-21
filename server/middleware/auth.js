const { verifyedToken } = require('../helpers/jwt')
const Question = require('../models/question')

function authentication(req, res, next) {
  try {
    let token = req.headers.token
    let decodeToken = verifyedToken(token)
    req.logedUser = decodeToken
    next()
  } catch (err) {
    next({status: 401, msg: `You are not Authentication!`})
  }
}

function authorization(req, res, next) {
  console.log(req.params);
  let { id } = req.logedUser
  let idQuestion = req.params.id
  Question.findById(idQuestion)
    .then(question => {
      if (question.userId == id) {
        next()
      } else[
        next({ status: 401, msg: `You are not Authorized!` })
      ]
    })
    .catch(err => {
      next(err)
    })
}

module.exports = { authentication, authorization }