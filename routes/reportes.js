const express = require('express');
const router = express.Router();
const { crearReporteExtravio, crearReporteHallazgo, obtenerReportesExtravio, registrarReporteHallazgoTx } = require('../controllers/reportes');

router.post('/extravio', crearReporteExtravio);
router.get('/extravio', obtenerReportesExtravio);

router.post('/hallazgo', crearReporteHallazgo);
router.post('/hallazgo/registrar', registrarReporteHallazgoTx);

module.exports = router;
