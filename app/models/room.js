const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');

var RoomSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    numberOfSeats:{
        type: Number,
        required: true,
    },
    floorNumber:{
        type: Number,
        required:true 
    },
    whiteboard:{
        type: Boolean,
        required: true
    },
    roomPic:{
        type: String,
        required:false
    },
    conference_cost_in_credits:{
        type: Number,
        required: false
    }
}, {
    collection: 'room',
    timestamps:true
});

RoomSchema.post('save', function(){
    //operations to be done after saving room
})

var Room = mongoose.model('Room', RoomSchema)
module.exports = {
    Room: Room
}