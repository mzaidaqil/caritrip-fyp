const jwt = require('jsonwebtoken')
const Business = require('../models/businessModel')

const requireBusinessAuth = async (req, res, next) => {
    const { authorization } = req.headers
    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }
    const token = authorization.split(' ')[1]
    try {
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.business = await Business.findOne({_id}).select('_id role')
        if(!req.business){
            return res.status(401).json({error: 'Business not found'})
        }
        next()
    } catch (error){
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireBusinessAuth;