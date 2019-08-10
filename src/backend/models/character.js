var mongoose = require('mongoose');

var characterSchema = mongoose.Schema({
  avatar: { type: String, required: true },
  owner: { type: String, required: true },
  name: { type: String, required: true },
  server: { type: String, required: true },
  datacenter: { type: String, required: true },
  lodestoneID: { type: String, required: true },
  // Job Map:
  // 1: GLA, 2: PGL, 3: MRD, 4: LNC, 5: ARC, 6: CNJ, 7: THM, 8: CRP, 9: BSM, 10: ARM,
  // 11: GSM, 12: LTW, 13: WVR, 14: ALC, 15: CUL, 16: MIN, 17: BTN, 18: FSH, 19: PLD,
  // 20: MNK, 21: WAR, 22: DRG, 23: BRD, 24: WHM, 25: BLM, 26: ACN, 27: SMN, 28: SCH,
  // 29: ROG, 30: NIN, 31: MCH, 32: DRK, 33: AST, 34: SAM, 35: RDM, 36: BLU 
  jobs: [{ type: Number }],
  parses: [{ type: Number }]
});

module.exports = mongoose.model('Character', characterSchema);

