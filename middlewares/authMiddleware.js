const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "mi_secreto");
        req.usuario = decoded;
        next();
    } catch (error) {
        console.error("Error al verificar token:", error);
        res.status(401).json({ error: "Token inválido" });
    }
};

module.exports = verificarToken;
