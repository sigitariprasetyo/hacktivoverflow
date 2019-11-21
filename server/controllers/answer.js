const Answer = require('../models/answer')
const Question = require('../models/question')

class AnswerController {
  static addAnswer(req, res, next) {
    let userId = req.logedUser.id
    let questionId = req.params.id
    let { answer } = req.body

    Answer.create({ userId, questionId, answer })
      .then(answer => {
        let promises = []
        promises.push(answer)
        return Question.findByIdAndUpdate(questionId, { $push: { answers: answer } }, { new: true, runValidators: true })
      })
      .then(promises => {
        res.status(201).json(promises.answer)
      })
      .catch(next)
  }

  static getAll(req, res, next) {
    let questionId = req.params.id
    Answer.find({ questionId }).populate('userId', 'username')
      .then(answers => {
        res.status(200).json(answers)
      })
      .catch(next)
  }

  static upVotes(req, res, next) {
    let answerId = req.params.id
    let { id } = req.logedUser
    let status = true
    Answer.findById(answerId)
      .then(answer => {
        if (answer.upVotes.includes(id)) {
          status = false
          return Answer.findByIdAndUpdate(answerId, { $pull: { upVotes: id } }, { new: true, runValidators: true })
        } else {
          let promises = []
          if (answer.downVotes.includes(id)) {
            promises.push(Answer.findByIdAndUpdate(answerId, { $pull: { downVotes: id } }, { new: true, runValidators: true }))
          }
          promises.push(Answer.findByIdAndUpdate(answerId, { $push: { upVotes: id } }, { new: true, runValidators: true }))
          return Promise.all(promises)
        }
      })
      .then(_ => {
        if (!status) res.status(200).json({ msg: 'Cancel Upvote!' })
        else res.status(200).json({ msg: 'Success Upvote!' })
      })
      .catch(next)
  }

  static downVotes(req, res, next) {
    let answerId = req.params.id
    let { id } = req.logedUser
    let status = true
    Answer.findById(answerId)
      .then(answer => {
        if (answer.downVotes.includes(id)) {
          status = false
          return Answer.findByIdAndUpdate(answerId, { $pull: { downVotes: id } }, { new: true, runValidators: true })
        } else {
          let promises = []
          if (answer.upVotes.includes(id)) {
            promises.push(Answer.findByIdAndUpdate(answerId, { $pull: { upVotes: id } }, { new: true, runValidators: true }))
          }
          promises.push(Answer.findByIdAndUpdate(answerId, { $push: { downVotes: id } }, { new: true, runValidators: true }))
          return Promise.all(promises)
        }
      })
      .then(_ => {
        if (!status) res.status(200).json({ msg: 'Cancel Downvote!' })
        else res.status(200).json({ msg: 'Success Downvote!' })
      })
      .catch(next)
  }

  static delete(req, res, next) {
    let { id } = req.params
    Answer.findByIdAndDelete(id)
      .then(respon => {
        res.status(200).json(respon)
      })
      .catch(next)
  }
}

module.exports = AnswerController