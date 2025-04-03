const express = require('express');
const router = express.Router();
const { crearMascota } = require('../controllers/mascotas');

router.post('/', crearMascota);

module.exports = router;
