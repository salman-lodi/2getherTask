const Booking = require('../../controllers/booking/booking.api.controller')
var express = require('express')
var router = express.Router()


router.post('/', Booking.createBooking);
router.get('/', Booking.getBookings);


module.exports = router;