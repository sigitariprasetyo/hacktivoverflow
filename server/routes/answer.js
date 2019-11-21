const router = require('express').Router()
const answerController = require('../controllers/answer')
const { authentication } = require('../middleware/auth')

router.get('/getAll/:id', answerController.getAll)
router.use(authentication)
router.post('/addAnswer/:id', answerController.addAnswer)
router.patch('/upVote/:id', answerController.upVotes)
router.patch('/downVote/:id', answerController.downVotes)
router.delete('/delete/:id', answerController.delete)

module.exports = router