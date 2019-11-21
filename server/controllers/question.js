const Question = require('../models/question')
const getObjUpdate = require('../helpers/objUpdate')
const axios = require('axios')

class QuestionController {
  static trending(req, res, next) {
    Question.aggregate([
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ])
      .then(question => {
        res.status(201).json(question)
      })
      .catch(next)
  }

  static addQuestion(req, res, next) {
    let { id } = req.logedUser
    let { title, description, tags } = req.body
    Question.create({
      userId: id, title, description, tags
    })
      .then(question => {
        res.status(201).json(question)
      })
      .catch(next)
  }

  static findAll(req, res, next) {
    Question.find().populate('userId', 'username').sort({ createdAt: 'desc' })
      .then(questions => {
        res.status(200).json(questions)
      })
      .catch(next)
  }

  static update(req, res, next) {
    let { id } = req.params
    let obj = getObjUpdate(req.body)
    Question.findByIdAndUpdate(id, obj, { new: true, runValidators: true })
      .then(questions => {
        res.status(200).json(questions)
      })
      .catch(next)
  }

  static myQuestion(req, res, next) {
    let { id } = req.logedUser
    Question.find({ userId: id }).populate('userId', 'username').sort({ createdAt: 'desc' })
      .then(questions => {
        res.status(200).json(questions)
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    let { id } = req.params
    Question.findOne({ _id: id }).populate('userId', 'username')
      .then(question => {
        res.status(200).json(question)
      })
      .catch(next)
  }

  static searchByTag(req, res, next) {
    let key = new RegExp(req.query.q)
    Question.find({ tags: key })
      .then(questions => {
        res.status(200).json(questions)
      })
      .catch(next)
  }

  static upVotes(req, res, next) {
    let questionId = req.params.id
    let { id } = req.logedUser
    let status = true
    Question.findById(questionId)
      .then(question => {
        if (question.upVotes.includes(id)) {
          status = false
          return Question.findByIdAndUpdate(questionId, { $pull: { upVotes: id } }, { new: true, runValidators: true })
        } else {
          let promises = []
          if (question.downVotes.includes(id)) {
            promises.push(Question.findByIdAndUpdate(questionId, { $pull: { downVotes: id } }, { new: true, runValidators: true }))
          }
          promises.push(Question.findByIdAndUpdate(questionId, { $push: { upVotes: id } }, { new: true, runValidators: true }))
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
    let questionId = req.params.id
    let { id } = req.logedUser
    let status = true
    Question.findById(questionId)
      .then(question => {
        if (question.downVotes.includes(id)) {
          status = false
          return Question.findByIdAndUpdate(questionId, { $pull: { downVotes: id } }, { new: true, runValidators: true })
        } else {
          let promises = []
          if (question.upVotes.includes(id)) {
            promises.push(Question.findByIdAndUpdate(questionId, { $pull: { upVotes: id } }, { new: true, runValidators: true }))
          }
          promises.push(Question.findByIdAndUpdate(questionId, { $push: { downVotes: id } }, { new: true, runValidators: true }))
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
    Question.findByIdAndDelete(id)
      .then(respon => {
        res.status(200).json(respon)
      })
      .catch(next)
  }

  static getQuote(req, res, next) {
    axios({
      method: 'get',
      url: `https://api.quotable.io/random`
    })
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch(next)
  }
}

module.exports = QuestionController