
const mongoose = require('mongoose');

const basicInfoprofileSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    title: {
        type: String, 
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    }, 
    phone: {
        type: String,
        required: true,
        trim: true
    }
    // picture: {
    //     type: String,
    //     required: true,
    //     trim: true 
    // }

    
});
 
module.exports = mongoose.model('basicinfo', basicInfoprofileSchema);