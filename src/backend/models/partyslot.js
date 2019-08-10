var mongoose = require('mongoose');

var partySlotSchema = mongoose.Schema({
  userOccupying: {
    cName: { type: String, required: true }, 
    cServer: { type: String, required: true },  
    cDC: { type: String, required: true },  
    cJob: { type: String, required: true },  
    cBUJobs: [ { type: String } ]
  },
  slotJobs: [ { type: String, required: true } ],
  slotLocked: { type: Boolean, required: true },
  slotOccupied: { type: Boolean, required: true }
});

module.exports = mongoose.model('PartySlot', partySlotSchema);