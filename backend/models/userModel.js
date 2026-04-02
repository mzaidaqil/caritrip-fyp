const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
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
        enum: ['user', 'admin', 'business'],
        default: 'user',
        required: true,
    }
}, { timestamps: true })


//static signup method 
userSchema.statics.signup = async function(firstName, lastName, email, password, confirmPassword, role) {

    //validation
    if(!firstName || !lastName || !email || !password || !confirmPassword || !role){
        throw Error('All fields are required')
    }
    if(!validator.isAlpha(firstName)){
        throw Error('First name must contain only letters')
    }
    if(!validator.isAlpha(lastName)){   
        throw Error('Last name must contain only letters')
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

    const user = await this.create({firstName, lastName, email, password: hash, role})

    return user
}

//static method for login
userSchema.statics.login = async function(email, password, role){
    if(!email || !password || !role === 'user'){
        throw Error('All fields are required')
    }
    if (!validator.isEmail(email)){
        throw Error('Invalid email')
    }

    const user = await this.findOne({email})

    if(!user){
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)


