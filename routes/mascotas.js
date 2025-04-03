const express = require('express');
const router = express.Router();
const { crearMascota, obtenerDataMascotas } = require('../controllers/mascotas');

router.post('/', crearMascota);
router.get('/data', obtenerDataMascotas);

module.exports = router;
