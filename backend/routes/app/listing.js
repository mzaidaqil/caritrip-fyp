const express = require('express')
const router = express.Router()

//controllers
const {getListings, getSingleListing} = require('../../controllers/listingController')

//get all listings
router.get('/', getListings)

//get a single listing
router.get('/:id', getSingleListing)


module.exports = router