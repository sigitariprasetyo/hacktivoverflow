const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  answer: {
    type: String,
    required: [true, 'Your Answer is required!']
  },
  upVotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downVotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
}, { timestamps: true })

AnswerSchema.pre('save', function (next) {
  this.upVotes = []
  this.downVotes = []
  next()
})

const Answer = mongoose.model('Answer', AnswerSchema)
module.exports = Answer