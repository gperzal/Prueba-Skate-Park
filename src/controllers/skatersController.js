import { Skater } from '../models/skaterModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { Console } from 'console';

// secretKey para JWT
const jwtSecret = process.env.JWT_SECRET

// Controlador para registrar un nuevo participante
// export const registerSkater = async (req, res, next) => {
//   const { email, nombre, password, anos_experiencia, especialidad, foto } = req.body;
//   console.log(req.body)
//   try {
//     // Verificar si el email ya está registrado
//     const existingUser = await Skater.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already registered." });
//     }

//     // Encriptar la contraseña
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Crear el nuevo participante
//     const skater = await Skater.create({
//       email,
//       nombre,
//       password: hashedPassword,
//       anos_experiencia,
//       especialidad,
//       foto,
//       estado: false
//     });
//     res.status(201).json(skater);
//   } catch (error) {
//     console.error('Error during Skater creation:', error.message);
//     next(error);  // Pasa el error al middleware de manejo de errores
//   }
// };

export const registerSkater = async (req, res, next) => {
  const { email, nombre, password, anos_experiencia, especialidad } = req.body;

  try {
    // Verificar si el email ya está registrado
    const existingUser = await Skater.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }


    // Manejar la carga del archivo
    if (!req.files || !req.files.photo) {
      return res.status(400).json({ message: 'No photo uploaded' });
    }

    console.log(req.files);
    console.log(req.files.photo);

    let uploadedFile = req.files.photo;
    const photoPath = `uploads/${uploadedFile.name}`;
    console.log(photoPath);
    // Guardar archivo en el servidor
    uploadedFile.mv(`./public/${photoPath}`, async (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to upload photo" });
      }

      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear el nuevo skater
      const skater = await Skater.create({
        email,
        nombre,
        password: hashedPassword,
        anos_experiencia,
        especialidad,
        foto: photoPath,
        estado: false
      });

      // res.status(201).json({ message: "Skater registered successfully", skater });
      res.redirect('/api/skaters/');
    });
  } catch (error) {
    next(error);  // Pasa el error al middleware de manejo de errores
  }
};


// Controlador para iniciar sesión
export const loginSkater = async (req, res, next) => {
  const { email, password, } = req.body;
  try {
    const skater = await Skater.findOne({ where: { email } });
    if (!skater) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, skater.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generar un token JWT incluyendo el role
    const token = jwt.sign(
      { id: skater.id, role: skater.role }, // Incluye el role aquí
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // res.json({ token });
    res.json({ token, userName: skater.nombre, userRole: skater.role }); 
  } catch (error) {
    next(error);
  }
};

// Controlador para obtener todos los participantes
export const getSkaters = async (req, res, next) => {
  try {
    let skaters = await Skater.findAll();
    skaters = JSON.parse(JSON.stringify(skaters));
    res.render(path.resolve("src", "views", "index.hbs"), { skaters: skaters });
  } catch (error) {
    next(error);
  }
};


export const updateSkater = async (req, res, next) => {
  const { id } = req.params;
  const { nombre, anos_experiencia, especialidad, estado, password } = req.body;
  let photoPath;

  try {
    const skater = await Skater.findByPk(id);
    if (!skater) {
      return res.status(404).json({ message: "Skater not found" });
    }

    // Actualizar la contraseña si se proporciona una nueva
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      skater.password = hashedPassword;
    }

    // Actualizar la foto si se sube una nueva
    if (req.files && req.files.photo) {
      const uploadedFile = req.files.photo;
      photoPath = `./public/uploads/${uploadedFile.name}`;

      // Eliminar la foto antigua si existe
      if (skater.foto && fs.existsSync(skater.foto)) {
        fs.unlinkSync(skater.foto);
      }

      // Guardar la nueva foto en el servidor
      uploadedFile.mv(photoPath, err => {
        if (err) {
          return res.status(500).json({ message: "Failed to upload new photo" });
        }
        skater.foto = photoPath;
      });
    }

    // Actualizar otros campos
    skater.nombre = nombre || skater.nombre;
    skater.anos_experiencia = anos_experiencia || skater.anos_experiencia;
    skater.especialidad = especialidad || skater.especialidad;
    skater.estado = estado !== undefined ? estado : skater.estado;

    // Guardar los cambios
    await skater.save();
    res.json({ message: "Skater updated successfully", skater });
  } catch (error) {
    console.error('Error updating skater:', error);
    res.status(500).json({ message: "Error updating skater." });
    next(error);
  }
};



// Controlador para eliminar un participante
export const deleteSkater = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Skater.destroy({ where: { id } });
    if (result === 0) {
      return res.status(404).json({ message: "Skater not found" });
    }
    res.json({ message: "Skater deleted" });
  } catch (error) {
    next(error);
  }
};





