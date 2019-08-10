const mongoose = require('mongoose');
const PartySlot = require('./partyslot')

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

const partySchema = mongoose.Schema({
  ownerName: { type: String, required: true },
  ownerCharName: { type: String, required: true },
  ownerServer: { type: String, required: true},
  ownerDC: {type: String, required: true},

  // list of all member's in the party, first index is always owner
  composition: [ partySlotSchema ], 
  
  // Instance
  // Should wrap in an instance object (will break attached components)
  instanceName: { type: String },
  instanceID: { type: String },
  instanceimg: { type: String },
  // Purpose
  purpose: { type: String, required: true },
  // Sync Options
  sync: { type: String, required: true},
  // Verified Only
  verf: { type: Boolean },
  // Password
  pw: { type: String },
  // Description
  description: { type: String, default: 'None' },
});

module.exports = mongoose.model('Party', partySchema);