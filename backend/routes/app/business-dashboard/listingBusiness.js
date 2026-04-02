const express = require('express')
const router = express.Router()

const { createListing, deleteListing, updateListing } = require('../../../controllers/listingController')

const requireBusinessAuth = require('../../../middleware/requireBusinessAuth')

router.use(requireBusinessAuth)

router.post('/', createListing)
router.delete('/:id', deleteListing)
router.patch('/:id', updateListing)

module.exports = router