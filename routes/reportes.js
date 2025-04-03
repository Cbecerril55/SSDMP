const express = require('express');
const router = express.Router();
const { crearReporteExtravio, crearReporteHallazgo } = require('../controllers/reportes');

//router.post('/extravio', crearReporteExtravio);
router.post('/hallazgo', crearReporteHallazgo);

module.exports = router;
