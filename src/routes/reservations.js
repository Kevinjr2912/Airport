const express = require('express');
const router = express.Router();
const reservationsControllers = require('../controllers/reservations')

router.put('/cancel/:id',)
router.get('/getStatusReservation',reservationsControllers.knowReservationStatus);

module.exports = router;