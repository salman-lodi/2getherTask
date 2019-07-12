const Room = require('../../controllers/room/room.api.controller')
var express = require('express')
var router = express.Router()


router.post('/', Room.addRoom);
router.get('/',Room.getRooms)

module.exports = router;