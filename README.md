# Sistema de Seguimiento de Mascotas Perdidas

Un sistema desarrollado con Node.js, Sequelize y MySQL para gestionar usuarios, mascotas y reportes de pérdida y hallazgo de mascotas.

## 📦 Requisitos Previos

* Node.js (v20.11.0 o superior)
* MySQL (v8.0 o superior)
* Sequelize
* Workbench para administrar la base de datos

## 🚀 Instalación

1. Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```

2. Instalar las dependencias:

```bash
npm install
```

3. Configurar la base de datos:

* Crear una base de datos en MySQL llamada `mascotas_db`.
* Importar los archivos SQL para crear las tablas y procedimientos almacenados.

4. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
DB_NAME=mascotas_db
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_HOST=127.0.0.1
DB_PORT=3306
NODE_TLS_REJECT_UNAUTHORIZED=0
```

## 📁 Estructura del Proyecto

```
📁 proyecto_final
├── controllers
│   ├── usuarios.js
│   ├── mascotas.js
│   └── reportes.js
├── db
│   └── db.js
├── middleware
├── models
│   ├── usuario.js
│   ├── mascota.js
│   └── reportesHallazgos.js
├── routes
│   ├── usuarios.js
│   ├── mascotas.js
│   └── reportes.js
├── app.js
├── package.json
├── README.md
└── .env
```

## 📝 Rutas Disponibles

### Usuarios

* Crear usuario:

```http
POST /usuarios
```

Body (JSON):

```json
{
    "nombre": "Laura García",
    "email": "laura.garcia@example.com",
    "telefono": "5551234567",
    "ubicacion": "CDMX"
}
```

### Mascotas

* Crear mascota:

```http
POST /mascotas
```

Body (JSON):

```json
{
    "nombre": "Fido",
    "especie": "Perro",
    "estado": "Perdido",
    "dueño_id": 3
}
```

### Reportes

* Crear reporte de extravío:

```http
POST /reportes/extravio
```

Body (JSON):

```json
{
    "mascota_id": 2,
    "descripcion": "Se escapó del patio trasero",
    "ubicacion": "CDMX",
    "usuario_id": 3
}
```

* Crear reporte de hallazgo (transacción):

```http
POST /reportes/hallazgo/registrar
```

Query Params:

```
reporte_id=2&usuario_id=3&ubicacion=CDMX&comentario=Lo vi cerca del parque
```

## 🏃‍♂️ Correr el Servidor

Para iniciar el servidor, usa el siguiente comando:

```bash
npm start
```

Si usas nodemon para desarrollo:

```bash
nodemon app.js
```

El servidor estará disponible en:

```http
http://localhost:3001
```

## 📄 Licencia

Este proyecto está licenciado bajo la MIT License.
