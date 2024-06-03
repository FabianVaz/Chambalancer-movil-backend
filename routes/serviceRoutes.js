const express = require('express');
const Service = require('../models/Service');
const router = express.Router();

// Crear un nuevo servicio
router.post('/', async (req, res) => {
  const { name, description, price, author } = req.body;
  try {
    const service = new Service({ name, description, price, author });
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener todos los servicios
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().populate('author', 'firstName lastName email');
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un servicio por ID
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('author', 'firstName lastName email');
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar un servicio por ID
router.put('/:id', async (req, res) => {
  const { name, description, price, author } = req.body;
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, { name, description, price, author }, { new: true });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar un servicio por ID
router.delete('/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
