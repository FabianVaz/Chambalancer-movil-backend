const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuario ya registrado con este correo electrónico' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const user = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    // Guardar el usuario en la base de datos
    await user.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
});

module.exports = router;
