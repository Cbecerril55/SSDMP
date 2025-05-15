const express = require('express');
const router = express.Router();
const { crearMascota, obtenerDataMascotas, eliminarMascota, actualizarMascota } = require('../controllers/mascotas');
const verificarToken = require('../middlewares/authMiddleware');

router.get('/data', obtenerDataMascotas);

router.post('/', crearMascota);

router.delete('/:id', verificarToken, eliminarMascota);

router.put('/:id', verificarToken, actualizarMascota);

module.exports = router;
