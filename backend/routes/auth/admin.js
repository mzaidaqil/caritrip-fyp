const express = require('express')
const router = express.Router()

//controllers
const {loginAdmin, signupAdmin} = require('../../controllers/adminController')

//login route 
router.post('/login', loginAdmin)

//signup route 
router.post('/signup', signupAdmin)

module.exports = router