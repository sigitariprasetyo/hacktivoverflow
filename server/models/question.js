const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, "Title of question is required!"]
  },
  description: {
    type: String,
    required: [true, "Description of question require!"]
  },
  upVotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downVotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  answers: [],
  tags: []
}, { timestamps: true })

QuestionSchema.pre('save', function (next) {
  this.upVotes = []
  this.downVotes = []
  this.answers = []
  next()
})

const Question = mongoose.model('Question', QuestionSchema)
module.exports = Question