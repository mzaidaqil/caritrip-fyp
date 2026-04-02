const Admin = require('../models/adminModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
   return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

//login controller

const loginAdmin = async (req, res) => {

    const {email, password, role} = req.body

    try {
        const admin = await Admin.login(email, password, role)

        //create token
        const token = createToken(admin._id)

        res.status(200).json({email, role, token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//signup controller 
const signupAdmin = async (req, res) => {

    const {email, password, role} = req.body

    try {
        const admin = await Admin.signup(email, password, role)

        //create token
        const token = createToken(admin._id)

        res.status(200).json({email, role, token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {loginAdmin, signupAdmin}