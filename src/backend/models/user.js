var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var partySchema = mongoose.Schema({
  id: { type: String, required: true },
  sub: { 
    endpoint: { type: String, default: null },
    keys: { 
      p256dh: { type: String, default: null },
      auth: { type: String, default: null }
    } 
  }  
});

var userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  parties: [ partySchema ],
  config: {
    notifications: {
      allow: { type: Boolean, default: true },
      partyFill: { type: Boolean, default: true },
      partyJoin: { type: Boolean, default: true },
      partyLeave: { type: Boolean, default: true },
      partyKick: { type: Boolean, default: true },
      partyReady: { type: Boolean, default: true },
      partyOptions: { type: Boolean, default: true },
      partyReminder: { type: Boolean, default: true }
    }
  },
  verf: { type: Boolean, default: false },
  verfToken: [ { type: String } ],
  charToken: { type: String },
  patreon: {
    userID: { type: Number },
    issued: { type: Date },
    access_token: { type: String },
    expires_in: { type: Number },
    token_type: { type: String },
    scope: { type: String },
    refresh_token: { type: String },
    version: { type: String }
  },
  rewards: {
    tier: { type: String, required: true, default: "Unverified" }, // Unverified, Verified, Adventurer, Raider, Legend
    topSortCount: { type: Number, required: true, default: 0 },
    topSortMax: { type: Number, required: true, default: 0 },
    highlightCount: { type: Number, required: true, default: 0 },
    highlightMax: { type: Number, required: true, default: 0 },
    maxPartyCount: { type: Number, required: true, default: 1 },
    unlimitedSortHighlight: { type: Boolean, required: true, default: false },
    refillDate: { type: Date, default: null }
  },
  referrer: {
    username: { type: String, default: null },

    // Analytics
    referralDate: { type: Date, default: null },
    referralSrc: { type: String, default: null }
  },
  referrals: [{
    username: { type: String, default: null },
    action: { type: String, default: null },

    // Analytics
    referralDate: { type: Date, default: null },
    referralSrc: { type: String, default: null }
  }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);