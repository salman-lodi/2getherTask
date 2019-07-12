// const users = require('../controllers/users/index.controller');
// var express = require('express'),
//     app = express.Router();

module.exports = function(app) {
    // app.all('/api/v1/*',users.isAuthenticated)
    // app.use('/', require('./index'))
    app.use('/api/v1/booking', require('./booking/booking.v1'))
    app.use('/api/v1/room', require('./room/room.v1'))
}