const Review = require('../models/reviewModel')
const mongoose = require('mongoose')
const Listing = require('../models/listingModel')

//get all reviews
const getReviews = async (req, res) => {
    const {listingId} = req.params;

    if(!mongoose.Types.ObjectId.isValid(listingId)){
        return res.status(404).json({error: 'Listing not found'})
    }

    const reviews = await Review.find({listingId}).sort({createdAt: -1})

    res.status(200).json(reviews)
}

//get a single review
const getSingleReview = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Review not found'})
    }

    const review = await Review.findById(id);

    if(!review){
        return res.status(404).json({error: 'Review not found'})
    }

    res.status(200).json(review)
}

//create a new review (userId from JWT via requireUserAuth — do not trust client body)
const createReview = async (req, res) => {
    const { title, content, rating, visitDate, visitType } = req.body
    const { listingId } = req.params

    if (!req.user) {
        return res.status(401).json({ error: 'Authorization required' })
    }
    const userId = req.user._id

    let emptyFields = []

    if (!title) emptyFields.push('title')
    if (!content) emptyFields.push('content')
    if (!rating) emptyFields.push('rating')
    if (!visitDate) emptyFields.push('visitDate')
    if (!visitType) emptyFields.push('visitType')
    if (!listingId) emptyFields.push('listingId')

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    try {
        const review = await Review.create({
            userId,
            listingId,
            title,
            content,
            rating,
            visitDate,
            visitType,
        })
        res.status(200).json(review)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//update a review (only the author)
const updateReview = async (req, res) => {
    const { id } = req.params

    if (!req.user) {
        return res.status(401).json({ error: 'Authorization required' })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Review not found' })
    }

    const existing = await Review.findById(id)
    if (!existing) {
        return res.status(404).json({ error: 'Review not found' })
    }
    if (String(existing.userId) !== String(req.user._id)) {
        return res.status(403).json({ error: 'You can only edit your own reviews' })
    }

    const allowedFields = ['title', 'content', 'rating', 'visitDate', 'visitType']
    const updates = {}
    allowedFields.forEach((field) => {
        if (field in req.body) {
            updates[field] = req.body[field]
        }
    })

    const review = await Review.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
    })

    res.status(200).json(review)
}

// delete a review (only the author; userId from JWT)
// Dashboard: DELETE /api/app/me/reviews/:id — no body; optional nested route can pass listingId in params
const deleteReview = async (req, res) => {
    const { id, listingId } = req.params

    if (!req.user) {
        return res.status(401).json({ error: 'Authorization required' })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Review not found' })
    }

    const userId = req.user._id

    //filter by userId and listingId if provided
    const filter = { _id: id, userId }
    if (listingId && mongoose.Types.ObjectId.isValid(listingId)) {
        filter.listingId = listingId
    }

    const review = await Review.findOneAndDelete(filter)

    if (!review) {
        return res.status(404).json({
            error: 'Review not found or not owned by you',
        })
    }

    res.status(200).json(review)
}

//business reply to a review 
const replyToReview = async (req, res) => {
    const { reviewId } = req.params;
    const { businessReply } = req.body;
    const businessId = req.business._id;

    //validate input 
    if(!mongoose.Types.ObjectId.isValid(reviewId)){
        return res.status(404).json({error: 'Review not found'})
    }
    if(!mongoose.Types.ObjectId.isValid(businessId)){
        return res.status(404).json({error: 'Business not found'})
    }
    if (!businessReply || !businessReply.trim()) {
        return res.status(400).json({ error: 'businessReply is required' })
    }

    try{
        //find review 
        const review = await Review.findById(reviewId);
        if(!review){
            return res.status(404).json({error: 'Review not found'})
        }

        //find listing from review.listingId
        const listing = await Listing.findById(review.listingId);
        if(!listing){
            return res.status(404).json({error: 'Listing not found'})
        }

        //check if business is the owner of the listing
        if(String(listing.business) !== String(businessId)){
            return res.status(403).json({error: 'You are not authorized to reply to this review'})
        }

        //update review with business reply
        review.businessReply = businessReply;
        review.businessReplyDate = new Date();
        review.businessReplyBy = businessId;

        //save
        await review.save();
        return res.status(200).json(review);
    }catch(error){
        return res.status(400).json({error: error.message})
    }
}

module.exports = {getReviews, getSingleReview, createReview, updateReview, deleteReview, replyToReview}