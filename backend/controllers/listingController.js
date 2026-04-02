const Listing = require('../models/listingModel')
const mongoose = require('mongoose')

//get all listings (optional: ?category=restaurant|hotel)
const getListings = async (req, res) => {
    const { category } = req.query
    const filter = {}

    if (category !== undefined && category !== '') {
        if (!['restaurant', 'hotel'].includes(category)) {
            return res.status(400).json({ error: 'category must be restaurant or hotel' })
        }
        filter.category = category
    }

    const listings = await Listing.find(filter).sort({ createdAt: -1 })
    res.status(200).json(listings)
}

//get a single listing
const getSingleListing = async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Listing not found'})
    }

    const listing = await Listing.findById(id);

    if(!listing){
        return res.status(404).json({error: 'Listing not found'})
    }

    res.status(200).json(listing)
}

//create a new listing
const createListing = async (req, res) => {
    const {title, description, location, priceRange, category} = req.body;
    const business = req.business._id;

    let emptyFields = [];

    if(!title){
        emptyFields.push('title')
    }
    if(!description){
        emptyFields.push('description')
    }
    if(!location){
        emptyFields.push('location')
    }
    if(!priceRange){
        emptyFields.push('priceRange')
    }
    if (!category) {
        emptyFields.push('category')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all fields', emptyFields})
    }

    try {
        const listing = await Listing.create({
            title,
            description,
            location,
            priceRange,
            category,
            business,
        })

        res.status(200).json(listing)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a listing (only the owning business)
const deleteListing = async (req, res) => {
    const { id } = req.params
    const businessId = req.business._id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Listing not found' })
    }

    const listing = await Listing.findOneAndDelete({
        _id: id,
        business: businessId,
    })

    if (!listing) {
        return res.status(404).json({ error: 'Listing not found or not owned by you' })
    }

    res.status(200).json(listing)
}

// update a listing (only the owning business; do not allow reassigning business via body)
const updateListing = async (req, res) => {
    const { id } = req.params
    const businessId = req.business._id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Listing not found' })
    }

    const allowedFields = ['title', 'description', 'location', 'priceRange', 'category']
    const updates = {}
    allowedFields.forEach((field) => {
        if (field in req.body) {
            updates[field] = req.body[field]
        }
    })

    const listing = await Listing.findOneAndUpdate(
        { _id: id, business: businessId },
        updates,
        { new: true, runValidators: true }
    )

    if (!listing) {
        return res.status(404).json({ error: 'Listing not found or not owned by you' })
    }

    res.status(200).json(listing)
}

module.exports = {getListings, getSingleListing, createListing, deleteListing, updateListing}