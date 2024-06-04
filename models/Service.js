const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  author: { type: String, required: true } // Asegúrate de que esto esté como String
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
