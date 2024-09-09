const express = require('express');
const router = express.Router();
const flightsControllers = require('../controllers/flights');

//Rutas para los endpoints
router.get('/getFlights', flightsControllers.searchFlights);

module.exports = router;