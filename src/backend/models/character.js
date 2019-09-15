var mongoose = require('mongoose');

var characterSchema = mongoose.Schema({
  avatar: { type: String, required: true },
  owner: { type: String, required: true },
  name: { type: String, required: true },
  server: { type: String, required: true },
  datacenter: { type: String, required: true },
  lodestoneID: { type: String, required: true },
  jobs: [{ type: Number }],
  parses: [{ type: Number }],
  nextRefresh: { type: Date }
});

module.exports = mongoose.model('Character', characterSchema);

