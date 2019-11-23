const mongoose = require('mongoose');

var partyslotSchema = mongoose.Schema({
  userOccupying: {
    name: { type: String, required: true },
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

var userNotificationSubscriptionSchema = mongoose.Schema({
  username: { type: String, required: true },
  sub: { 
    endpoint: { type: String, default: null },
    keys: { 
      p256dh: { type: String, default: null },
      auth: { type: String, default: null }
    } 
  },
  partyFill: { type: Boolean, required: true },
  partyJoin: { type: Boolean, required: true },
  partyLeave: { type: Boolean, required: true },
  partyKick: { type: Boolean, required: true },
  partyReady: { type: Boolean, required: true },
  partyOptions: { type: Boolean, required: true },
  partyReminder: { type: Boolean, required: true }
});

const partySchema = mongoose.Schema({
  ownerName: { type: String, required: true },
  ownerCharName: { type: String, required: true },
  ownerServer: { type: String, required: true},
  ownerDC: {type: String, required: true},

  // list of all member's in the party, first index is always owner
  composition: [ partyslotSchema ], 
  
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
  // Notifications
  subscribers: [ userNotificationSubscriptionSchema ]
});

module.exports = mongoose.model('Party', partySchema);