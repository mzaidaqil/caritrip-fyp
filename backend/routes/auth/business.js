const express = require('express')
const router = express.Router()

//controllers
const { loginBusiness, signupBusiness } = require('../../controllers/businessController')

//login route 
router.post('/login', loginBusiness)

//signup route 
router.post('/signup', signupBusiness)

module.exports = router