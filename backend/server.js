require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/auth/user')
const adminRoutes = require('./routes/auth/admin')   
const businessRoutes = require('./routes/auth/business')
const listingRoutes = require('./routes/app/listing')
const listingBusinessRoutes = require('./routes/app/business-dashboard/listingBusiness')
const reviewRoutes = require('./routes/app/review')
const reviewUserDashboardRoutes = require('./routes/app/user-dashboard/reviewUser')
const reviewBusinessRoutes = require('./routes/app/business-dashboard/reviewBusiness')

//express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/app/user', userRoutes)
app.use('/api/app/admin', adminRoutes)
app.use('/api/app/business', businessRoutes)
// App (diner): reviews nested under a listing — mount before `/api/app/listings` so paths like
// `/api/app/listings/:listingId/reviews` are not swallowed by `GET /:id` on listings.
app.use('/api/app/listings/:listingId/reviews', reviewRoutes)
// Logged-in user: edit own review from account/dashboard (same controller as before)
app.use('/api/app/dashboard/reviews', reviewUserDashboardRoutes)
app.use('/api/app/listings', listingRoutes)
//Business dashboard: manage listings
app.use('/api/business/dashboard/listings', listingBusinessRoutes)
// Dashboard (business): reply to a review on own listings
app.use('/api/business/dashboard/reviews', reviewBusinessRoutes)

//connect to db 
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen for request
        app.listen(process.env.PORT, () => {
        console.log('connected to db & listening in port', process.env.PORT)
        })
    })
    .catch((error)=> {
        console.log(error)
    })
