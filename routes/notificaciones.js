const express = require('express');
const router = express.Router();
const { crearNotificacion, obtenerNotificaciones, marcarComoLeida, eliminarNotificacion } = require('../controllers/notificaciones');
const verificarToken = require('../middlewares/authMiddleware');

router.get('/', verificarToken, obtenerNotificaciones);
router.post('/', verificarToken, crearNotificacion);
router.put('/:id', verificarToken, marcarComoLeida);
router.delete('/:id', verificarToken, eliminarNotificacion);

module.exports = router;
