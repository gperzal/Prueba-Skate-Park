# Proyecto Skate Park

## Descripción

Este proyecto es un sistema de gestión para un parque de patinaje que permite a los usuarios registrarse, iniciar sesión y actualizar su perfil. Los administradores pueden aprobar o rechazar solicitudes de nuevos skaters y gestionar los perfiles de los usuarios registrados.

## Tecnologías Utilizadas

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Sequelize](https://img.shields.io/badge/sequelize-%2300f.svg?style=for-the-badge&logo=sequelize&logoColor=white)
![Handlebars](https://img.shields.io/badge/handlebars-%23404d59.svg?style=for-the-badge&logo=handlebars.js&logoColor=%2361DAFB)
![Bcrypt](https://img.shields.io/badge/bcrypt-%2300f.svg?style=for-the-badge&logo=bcrypt&logoColor=white)
![JSON Web Tokens](https://img.shields.io/badge/JWT-%2300f.svg?style=for-the-badge&logo=json-web-tokens&logoColor=white)

## Funcionalidades

| Ruta                    | Método | Descripción                                         | Token Requerido |
|-------------------------|--------|-----------------------------------------------------|-----------------|
| `/api/skaters/register` | POST   | Registra un nuevo skater y sube su foto.            | No              |
| `/api/skaters/login`    | POST   | Autentica a los skaters y genera un token.          | No              |
| `/api/skaters`          | GET    | Muestra la lista de todos los skaters.              | Sí (admin)      |
| `/api/skaters/:id`      | PUT    | Actualiza la información del skater.                | Sí              |
| `/api/skaters/:id`      | DELETE | Elimina el registro de un skater.                   | Sí (admin)      |
| `/admin`                | GET    | Muestra el dashboard de administración.             | Sí (admin)      |
| `/profile`              | GET    | Muestra el perfil del skater logueado.              | Sí              |
| `/logout`               | GET    | Cierra la sesión del skater y elimina el token.     | Sí              |

## Middleware

- `authenticate`: Verifica que el token JWT sea válido antes de permitir acceso a rutas protegidas.
- `authorizeAdmin`: Asegura que solo los usuarios con rol de admin puedan acceder a ciertas rutas.

## Seguridad

- Uso de `bcrypt` para hash de contraseñas.
- Autenticación basada en tokens JWT para proteger rutas y mantener la sesión del usuario.
- Protección contra inyecciones SQL mediante el uso de `sequelize`.
- Validación de entradas de usuario para evitar XSS y otras vulnerabilidades.


### Instalación

Para iniciar la aplicación, siga estos pasos:

1. Clona este repositorio en tu máquina local:

`git clone https://github.com/gperzal/Prueba-Skate-Park.git`

2. Navega al directorio del proyecto:

`cd Prueba-Skate-Park.git`

3. Instala las dependencias necesarias:

`npm i`

4. Crear y configurar tu archivo:

`.env`

5. Inicia el servidor:

`npm start`
