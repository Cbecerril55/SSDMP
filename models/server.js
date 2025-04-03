const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { db } = require('../db/db.js');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3001;
        this.paths = {
           // usuarios: '/usuarios',
            mascotas: '/mascotas',
            //reportes: '/reportes',
        };

        // Connect to the database
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    async connectDB() {
        try {
          await db.authenticate();
          console.log(' Database connected');
        } catch (error) {
          console.error(' Error real de conexión:', error);
          throw new Error('Database connection failed');
        }
      }
    middlewares() {
        // CORS
        this.app.use(cors());

        // Body parser
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        // Public directory
        this.app.use(express.static('public'));
    }
    routes() {
       // this.app.use(this.paths.usuarios, require('../routes/usuarios.js'));
        this.app.use(this.paths.mascotas, require('../routes/mascotas.js'));
        ///his.app.use(this.paths.reportes, require('../routes/reportes.js'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
    close() {
        this.app.close();
    }
}

module.exports = Server;