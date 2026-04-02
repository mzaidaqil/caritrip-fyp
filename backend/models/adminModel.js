const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin'],
        default: 'admin',
        required: true,
    }
}, { timestamps: true })


//static signup method 
adminSchema.statics.signup = async function(email, password, role) {

    //validation 
    if(!email || !password || !role){
        throw Error('ALl fields are required')
    }
    if (!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }
    
    const exist = await this.findOne({email})

    if(exist){
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const admin = await this.create({email, password: hash, role})

    return admin
}

//static method for login
adminSchema.statics.login = async function(email, password, role){
    if(!email || !password || !role === 'admin'){
        throw Error('All fields are required')
    }
    if (!validator.isEmail(email)){
        throw Error('Invalid email')
    }

    const admin = await this.findOne({email})

    if(!admin){
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, admin.password)

    if(!match){
        throw Error('Incorrect password')
    }

    return admin
}

module.exports = mongoose.model('Admin', adminSchema)


