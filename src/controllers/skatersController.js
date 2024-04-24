import { Skater } from '../models/skaterModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// secretKey para JWT
const jwtSecret = process.env.JWT_SECRET

// Controlador para registrar un nuevo participante
export const registerSkater = async (req, res, next) => {
  const { email, nombre, password, anos_experiencia, especialidad, foto } = req.body;
  console.log(req.body)
  try {
    // Verificar si el email ya está registrado
    const existingUser = await Skater.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo participante
    const skater = await Skater.create({
      email,
      nombre,
      password: hashedPassword,
      anos_experiencia,
      especialidad,
      foto,
      estado: false
    });
    res.status(201).json(skater);
  } catch (error) {
    console.error('Error during Skater creation:', error.message);
    next(error);  // Pasa el error al middleware de manejo de errores
  }
};

// Controlador para iniciar sesión
export const loginSkater = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const skater = await Skater.findOne({ where: { email } });
    if (!skater) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, skater.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: skater.id }, jwtSecret, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

// Controlador para obtener todos los participantes
export const getSkaters = async (req, res, next) => {
  try {
    const skaters = await Skater.findAll();
    res.json(skaters);
  } catch (error) {
    next(error);
  }
};

// Controlador para actualizar un participante
export const updateSkater = async (req, res, next) => {
  const { id } = req.params;
  const { nombre, anos_experiencia, especialidad, estado } = req.body;
  try {
    const skater = await Skater.update({ nombre, anos_experiencia, especialidad, estado }, { where: { id } });
    if (skater[0] === 0) {
      return res.status(404).json({ message: "Skater not found" });
    }
    res.json({ message: "Skater updated" });
  } catch (error) {
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