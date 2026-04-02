const express = require('express')
const router = express.Router({ mergeParams: true })

//controllers
const { getReviews, getSingleReview, createReview } = require('../../controllers/reviewController')

//middleware
const requireUserAuth = require('../../middleware/requireUserAuth')

//get all reviews
router.get('/', getReviews)

//check if user is authenticated
router.use(requireUserAuth)

//get a single review
router.get('/:id', getSingleReview)

//create a new review
router.post('/', createReview)


module.exports = router