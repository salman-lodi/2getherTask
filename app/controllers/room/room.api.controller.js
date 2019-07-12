const constants = require('../../utils/constants')
const Room = require('../../models/room').Room;
const Booking = require('../../models/booking').Booking;
const ResourceDeletionError = require('../../errors/general.errors').ResourceDeletionError;
const ResourceNotFoundError = require('../../errors/general.errors').ResourceNotFoundError;
const ResourceAlreadyPresentError = require('../../errors/general.errors').ResourceAlreadyPresentError;
import {
    DatabaseSave
} from '../../utils/enum/db.enum';


exports.addRoom = function(req, res, next) {
    if (!req.body.room || !req.body.room[constants.NAME] || !req.body.room[constants.NUMBER_OF_SEATS]|| !req.body.room[constants.FLOOR_NUMBER]|| !req.body.room[constants.WHITEBOARD]|| !req.body.room[constants.ROOM_PIC]|| !req.body.room[constants.CONFERENCE_COST_IN_CREDITS]) {
        return res.status(400).json({
            msg: constants.PARAMETER_MISSING + ':' + constants.NAME + ' or ' + constants.NUMBER_OF_SEATS + ' or ' + constants.FLOOR_NUMBER + ' or ' + constants.WHITEBOARD+ ' or ' + constants.ROOM_PIC+ ' or ' + constants.CONFERENCE_COST_IN_CREDITS,
            dbStatus: DatabaseSave.FAILED
        })
    } else {
        let query = {
            'name': req.body.room[constants.name]
        }
        Room.findOne(query).then(result => {
            // Checking if result is empty or not.If not present then create
            if (!result) {
                let data = {
                    'name': req.body[constants.NAME],
                    'numberOfSeats': req.body[constants.NUMBER_OF_SEATS],
                    'floorNumber': req.body[constants.FLOOR_NUMBER],
                    'whiteboard': req.body[constants.WHITEBOARD],
                    'roomPic': req.body[constants.ROOM_PIC],
                    'conference_cost_in_credits': req.body[constants.CONFERENCE_COST_IN_CREDITS]
                }
                let newRoom = new Room(data);
                newRoom.save(function(err, result) {
                    if (err) return next(err);
                    return res.status(201).json({
                        data: result,
                        msg: constants.SUCCESS,
                        dbStatus: DatabaseSave.SUCCESS
                    })

                })
            } else {
                // If Privilege is already present 
                throw new ResourceAlreadyPresentError(result)
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

exports.getRooms = function(req,res,next){
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
