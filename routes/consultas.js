const express = require('express');
const router = express.Router();
const { obtenerHistorialMascota, notificarUsuariosCercanos, obtenerNotificaciones } = require('../controllers/consultas');


router.get('/historial/:id', obtenerHistorialMascota);
router.get('/notificaciones', obtenerNotificaciones);

router.post('/notificar', notificarUsuariosCercanos);



module.exports = router;
