// Import the mongoose module
const mongoose = require('mongoose');


// define a schema
const susbcriberSchema = new mongoose.Schema({
    name: {
        type: String,  // String is shorthand for {type: String}
        required: true,
    },
    subscribedChannel:{
        type: String,
        required: true,  //mongoose inbuilt required validator
    },
    subscribedDate: {
        type: Date,    // `lastActiveAt` is a date
        required: true,
        default: Date.now
    }
})


// compile our model
module.exports = mongoose.model('Subscriber',susbcriberSchema);