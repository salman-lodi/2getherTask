const constants = require('../../utils/constants')
const Booking = require('../../models/booking').Booking;
const Room = require('../../models/room').Room;
const _ = require('lodash');
const ResourceDeletionError = require('../../errors/general.errors').ResourceDeletionError;
const ResourceNotFoundError = require('../../errors/general.errors').ResourceNotFoundError;
const ResourceAlreadyPresentError = require('../../errors/general.errors').ResourceAlreadyPresentError;
import {
    DatabaseSave
} from '../../utils/enum/db.enum';
const mongoose = require('mongoose');

exports.createBooking = function(req,res,next){
    // console.log('In createBooking');
    if (!req.body.booking || !req.body.booking[constants.USERNAME] || !req.body.booking[constants.DATE_TO_BOOK] || !req.body.booking[constants.SLOTS_REQUIRED]|| !req.body.booking[constants.ROOM_ID]) {
        return res.status(400).json({
            msg: constants.PARAMETER_MISSING + 'or' + constants.USERNAME + 'or' + constants.DATE_TO_BOOK + 'or' + constants.SLOTS_REQUIRED + 'or' +constants.ROOM_ID,
            dbStatus: DatabaseSave.FAILED
        })
    } else {
        // console.log('In createBooking');
        let query = {
            'roomId': req.body.booking[constants.ROOM_ID],
            'reservations.slotNumber':{
                '$in': req.body.booking[constants.SLOTS_REQUIRED]
            }
        }
        Booking.findOne(query).then(result => {
            // Checking if result is empty or not.If not present then create
            if (!result) {
                let findQuery = {
                    'roomId': req.body.booking[constants.ROOM_ID],
                    'dateToBook': req.body.booking[constants.DATE_TO_BOOK]
                }
                Booking.findOne(findQuery).then(result => {
                    if (!result) {
                        let reservations = [];
                        _.forEach(req.body.booking[constants.SLOTS_REQUIRED],function(slot){
                            let reservation = {
                                'slotNumber':slot,
                                'userName':req.body.booking[constants.USERNAME]
                            }
                            reservations.push(reservation);
                        })
                        let data = {
                            'roomId': req.body.booking[constants.ROOM_ID],
                            'dateToBook': req.body.booking[constants.DATE_TO_BOOK],
                            'reservations': reservations                            
                        } 
                        let newBooking = new Booking(data);
                        newBooking.save().then((result)=> {
                            // if (err) return next(err);
                            res.status(201).json({
                                data: result,
                                msg: constants.SUCCESS,
                                dbStatus: DatabaseSave.SUCCESS
                            })
                        })
                        .catch((err)=>{return next(err)});
                    } else{
                        let reservations = [];
                        _.forEach(req.body.booking[constants.SLOTS_REQUIRED],function(slot){
                            let reservation = {
                                'slotNumber':slot,
                                'userName':req.body.booking[constants.USERNAME]
                            }
                            reservations.push(reservation);
                        })
                        let update = {
                            $push:{
                                'reservations':reservations    
                            }
                        }
                        Booking.findOneAndUpdate(findQuery,update,{new:true}).then(booking=>{
                            res.status(200).json({
                                data:booking,
                                msg:constants.UPDATE_SUCCESS,
                                dbStatus:DatabaseSave.SUCCESS
                            })
                        })
                    }                    
                })
                .catch(e => {
                    return next(e);
                })
            } else{
                res.status(400).json({
                    data:{},
                    msg: constants.SLOT_IS_FULL,
                    dbStatus:DatabaseSave.ERROR
                })
            }
        })
        .catch(ResourceAlreadyPresentError, (e) => {
            res.status(400).json({
                msg: constants.RESOURCE_ALREADY_PRESENT,
                dbStatus: DatabaseSave.RESOURCE_ALREADY_PRESENT,
                data: e.message
            })
        })
        .catch(e => {
            return next(e);
        })
    }
}

exports.getBookings = function(req,res,next){
    let pageNo = req.query[constants.PAGE_NUMBER] ? req.query[constants.PAGE_NUMBER] - 1 : 0;
    let limit = req.query[constants.LIMIT] ? req.query[constants.LIMIT] : 10;
    let offset = pageNo * limit;
    Booking
        .find()
        .skip(offset)
        .select('-createdAt -updatedAt')
        .limit(parseInt(limit))
        .then(result => {
            res.send(result);
        })
}
