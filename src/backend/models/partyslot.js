var mongoose = require('mongoose');

var partyslotSchema = mongoose.Schema({
  userOccupying: {
    name: { type: String, required: true },
    cName: { type: String, required: true }, 
    cServer: { type: String, required: true },  
    cDC: { type: String, required: true },  
    cJob: { type: String, required: true },  
    cBUJobs: [ { type: String } ],
    tier: { type: String, required: true, default: "Unverified" }
  },
  slotJobs: [ { type: String, required: true } ],
  slotLocked: { type: Boolean, required: true },
  slotOccupied: { type: Boolean, required: true }
});

module.exports = mongoose.model('PartySlot', partyslotSchema);