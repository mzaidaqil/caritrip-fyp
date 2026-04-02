const Business = require('../models/businessModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
   return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

//login controller

const loginBusiness = async (req, res) => {

    const {email, password, role} = req.body

    try {
        const business = await Business.login(email, password, role)

        //create token
        const token = createToken(business._id)

        res.status(200).json({email, role, token})  

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//signup controller 
const signupBusiness = async (req, res) => {

    const {businessName, businessDescription, ssmNumber, businessAddress, businessCity, email, password, confirmPassword, role} = req.body

    try {
        const business = await Business.signup(businessName, businessDescription, ssmNumber, businessAddress, businessCity, email, password, confirmPassword, role)

        //create token
        const token = createToken(business._id)

        res.status(200).json({email, businessName, businessDescription, ssmNumber, businessAddress, businessCity, token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {loginBusiness, signupBusiness}