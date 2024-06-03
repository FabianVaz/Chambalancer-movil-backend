const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
