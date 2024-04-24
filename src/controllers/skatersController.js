import jwt from 'jsonwebtoken';
import { Skater } from '../models/skaterModel.js';

export const registerSkater = async (req, res) => {
  try {
    const skater = await Skater.create(req.body);
    res.status(201).send(skater);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const loginSkater = async (req, res) => {
  // Lógica para verificar credenciales y generar JWT
};
