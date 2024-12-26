const express = require('express');
const BR = require('../controller/bookingC'); 
const { tokensecure } = require('../middlewhere/Auth'); 
const router = express.Router();


router.post('/api/bookings', tokensecure, BR.createBooking);
router.get('/api/bookings', tokensecure, BR.getAllBookings);
router.get('/api/bookings/:id', tokensecure, BR.getBookingById);
router.put('/api/bookings/:id/status', tokensecure, BR.updateBookingStatus);
router.delete('/api/bookings/:id', tokensecure, BR.deleteBooking);

module.exports = router;
                                            