var mongoose = require('mongoose');

var partyPurposeSchema = mongoose.Schema({
  icon: { type: String },
  title: { type: String },
});

module.exports = mongoose.model('PartyPurpose', partyPurposeSchema);