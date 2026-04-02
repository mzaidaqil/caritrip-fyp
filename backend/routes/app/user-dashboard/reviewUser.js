const express = require('express')
const router = express.Router()

const { updateReview, deleteReview } = require('../../../controllers/reviewController')
const requireUserAuth = require('../../../middleware/requireUserAuth')

router.use(requireUserAuth)

// User "dashboard" / account: edit own review (not nested under listing)
router.patch('/:id', updateReview)
router.delete('/:id', deleteReview)

module.exports = router
