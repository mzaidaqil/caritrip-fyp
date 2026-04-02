const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const businessSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true,
    },
    businessDescription: {
        type: String,
        required: true,
    },
    ssmNumber : {
        type: String,
        required: true,
        unique: true,
    },
    businessAddress: {
        type: String,
        required: true,
    },
    businessCity: {
        type: String,
        required: true,
    },
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
        enum: ['business'],
        default: 'business',
        required: true,
    }
}, { timestamps: true })


//static signup method 
businessSchema.statics.signup = async function(businessName, businessDescription, ssmNumber, businessAddress, businessCity, email, password, confirmPassword, role) {

    //validation 
    if(!businessName || !businessDescription || !ssmNumber || !businessAddress || !businessCity || !email || !password || !confirmPassword || !role){
        throw Error('ALl fields are required')
    }
    if(!validator.isNumeric(ssmNumber)){
        throw Error('SSM number must contain only numbers')
    }
    if(!validator.isAlpha(businessCity)){
        throw Error('Business city must contain only letters')
    }
    if (!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }
    if(password !== confirmPassword){
        throw Error('Passwords do not match')
    }
    
    const exist = await this.findOne({email})

    if(exist){
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const business = await this.create({businessName, businessDescription, ssmNumber, businessAddress, businessCity, email, password: hash, role})

    return business
}

//static method for login
businessSchema.statics.login = async function(email, password, role){
    if(!email || !password || !role === 'business'){
        throw Error('All fields are required')
    }
    if (!validator.isEmail(email)){
        throw Error('Invalid email')
    }

    const business = await this.findOne({email})

    if(!business){
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, business.password)

    if(!match){
        throw Error('Incorrect password')       
    }

    return business
}

module.exports = mongoose.model('Business', businessSchema)


