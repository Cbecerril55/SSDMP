const express = require('express');
const router = express.Router();
const verificarToken = require("../middlewares/authMiddleware");
const { crearUsuario, obtenerUsuarios, loginUsuario, eliminarUsuario } = require('../controllers/usuarios');

router.get('/', verificarToken, obtenerUsuarios);

router.post('/', crearUsuario);
router.post('/login', loginUsuario);

router.delete("/:id", verificarToken, eliminarUsuario);

module.exports = router;
