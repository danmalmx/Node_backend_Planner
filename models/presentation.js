const mongoose = require('mongoose');
 
const presentationProfileSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    presentation: { 
        type: String 
    }, 
    basicinfo: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'basicinfo',
        required: true
        }
    });
 
module.exports = mongoose.model('presentation', presentationProfileSchema);