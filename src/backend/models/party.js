const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

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
  shortID: { type: String, required: true, unique: true },

  ownerName: { type: String, required: true },
  ownerCharName: { type: String, required: true },
  ownerServer: { type: String, required: true},
  ownerDC: {type: String, required: true},

  composition: [ partyslotSchema ],

  topSort: { type: Boolean },
  highlight: { type: Boolean },

  instanceName: { type: String },
  instanceID: { type: String },
  instanceimg: { type: String },
  difficulty: { type: String, required: true },
  itype: { type: String, required: true },
  purpose: { type: String, required: true },
  sync: { type: String, required: true},
  verf: { type: Boolean },
  description: { type: String, default: 'None' },

  pw: { type: String },
  private: { type: Boolean },
});

partySchema.plugin(uniqueValidator);
module.exports = mongoose.model('Party', partySchema);