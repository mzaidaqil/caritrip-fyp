const express = require('express')

const router = express.Router()

//constroller 
const {replyToReview} = require('../../../controllers/reviewController')

//middleware
const requireBusinessAuth = require('../../../middleware/requireBusinessAuth')

router.use(requireBusinessAuth)

//reply to a review 
router.patch('/:reviewId/reply', replyToReview);

module.exports = router;