const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listingSchema = new Schema ({
    title: {
        type: String, 
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    priceRange: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['restaurant', 'hotel'],
    },
    business: {
        type: Schema.Types.ObjectId,
        ref: 'Business',
    },
    
}, {timestamps: true})

module.exports = mongoose.model('Listing', listingSchema)