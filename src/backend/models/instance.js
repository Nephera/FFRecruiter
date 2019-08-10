const mongoose = require('mongoose');

const instanceSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  tags: [{ type: String, required: true }],
  playerCount: { type: Number, required: true },
  img: { type: String, required: true },
});

module.exports = mongoose.model('Instance', instanceSchema);
