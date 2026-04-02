const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const reviewSchema = new Schema({ 
    userId : {
        type : Schema.Types.ObjectId, 
        ref : 'User',
        required : true,
    },
    listingId : {
        type : Schema.Types.ObjectId, 
        ref : 'Listing',
        required : true,
    },
    rating : {
        type : Number,
        required : true,
        min: 1,
        max: 5,
    },
    title: {
        type : String,
        required : true,
    },
    content: {
        type : String,
        required : true,
    },
    visitDate: {
        type : Date,
        required : true,
    },
    visitType: {
        type : String,
        enum : ['lunch', 'dinner', 'breakfast', 'brunch', 'other'],
        required : true,
    },
    //done by ai later
    aiStatus: {
        type : String, 
        enum : ['pending', 'clean', 'fake'],
        default : 'pending',
    }, 
    aiConfidence: {
        type : Number,
        min: 0,
        max: 100,
        default : 0,
    },
    isFlagged: {
        type : Boolean,
        default : false,
    },
    flaggedReason : {
        type : String,
        default : '',
    },

    //business reply

    businessReply: {
        type : String,
        default : '',
    },
    businessReplyDate: {
        type : Date,
        default : null,
    },
    businessReplyBy: {
        type : Schema.Types.ObjectId,
        ref : 'Business',
    },

}, {timestamps: true})

module.exports = mongoose.model('Review', reviewSchema)