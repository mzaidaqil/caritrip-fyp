const User = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
   return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

//login controller

const loginUser = async (req, res) => {

    const {email, password, role} = req.body

    try {
        const user = await User.login(email, password, role)

        //create token
        const token = createToken(user._id)

        res.status(200).json({email, role, token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//signup controller 
const signupUser = async (req, res) => {

    const {firstName, lastName, email, password, confirmPassword, role} = req.body

    try {
        const user = await User.signup(firstName, lastName, email, password, confirmPassword, role)

        //create token
        const token = createToken(user._id)

        res.status(200).json({firstName, lastName, email, role, token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {loginUser, signupUser}