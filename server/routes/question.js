const router = require('express').Router()
const QuestionController = require('../controllers/question')
const { authentication, authorization } = require('../middleware/auth')

router.get('/', QuestionController.findAll)
router.get('/search', QuestionController.searchByTag)
router.get('/detail/:id', QuestionController.findOne)
router.get('/trending', QuestionController.trending)
router.get('/getQuote', QuestionController.getQuote)

router.use(authentication)
router.get('/myQuestion', QuestionController.myQuestion)
router.post('/', QuestionController.addQuestion)
router.patch('/upVote/:id', QuestionController.upVotes)
router.patch('/downVote/:id', QuestionController.downVotes)

router.patch('/update/:id', authorization, QuestionController.update)
router.delete('/delete/:id', authorization, QuestionController.delete)


module.exports = router