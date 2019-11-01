var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  parties: [{ type: String }],
  config: {
    notifications: {
      partyFill: { type: Boolean, default: true },
      partyJoin: { type: Boolean, default: true },
      partyLeave: { type: Boolean, default: true },
      partyKick: { type: Boolean, default: true },
      partyReady: { type: Boolean, default: true },
      partyOptions: { type: Boolean, default: true },
      partyReminder: { type: Boolean, default: true }
    }
  }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);