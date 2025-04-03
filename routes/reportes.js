const express = require('express');
const router = express.Router();
const { crearReporteExtravio, crearReporteHallazgo, obtenerReportesExtravio } = require('../controllers/reportes');

router.post('/extravio', crearReporteExtravio);
router.get('/extravio', obtenerReportesExtravio);

router.post('/hallazgo', crearReporteHallazgo);

module.exports = router;
