const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');

var BookingSchema = new Schema({
    dateToBook:{
        type: String,
        required: true
    },    
    roomId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'room'
    },
    reservations:[{
        slotNumber:{
            type: Number
        },
        userName: {
            type: String
        } 
    }]
}, {
    collection: 'booking',
    timestamps:true
});

BookingSchema.pre('save', function(next){
    next();
    //operations to be done before saving booking
})

var Booking = mongoose.model('Booking', BookingSchema)
module.exports = {
    Booking: Booking
}









