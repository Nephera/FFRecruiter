import { Injectable } from '@angular/core';

@Injectable()
export class partyIcons {
  // Accent and Overlay Icons
  empty = {
    icon: "https://imagizer.imageshack.com/img921/1092/gfROWT.png",
    background: ""
  }

  slotHighlight = {
    icon: "https://imagizer.imageshack.com/img923/4518/123vGc.png",
    background: ""
  }

  partyLeader = {
    icon: "https://imagizer.imageshack.com/img922/6222/jvVDTj.png",
    background: ""
  }

  slotFilled = {
    icon: "https://imagizer.imageshack.com/img921/2733/cIKadV.png",
    background: ""
  }

  slotUnfilled = {
    icon: "https://imagizer.imageshack.com/img923/8926/57YPLZ.png",
    background: ""
  }

  instanceIconGradient = {
    icon: "https://imagizer.imageshack.com/img924/332/fmfyo0.png",
    background: ""
  }

  unverifiedSlotFlair = {
    icon: "https://imagizer.imageshack.com/img921/1092/gfROWT.png"
  }

  verifiedSlotFlair = {
    icon: "https://imagizer.imageshack.com/img924/4162/mivYCy.png"
  }

  adventurerSlotFlair = {
    icon: "https://imagizer.imageshack.com/img923/1896/ovu7k5.png"
  }

  raiderSlotFlair = {
    icon: "https://imagizer.imageshack.com/img921/1092/gfROWT.png"
  }

  legendSlotFlair = {
    icon: "https://imagizer.imageshack.com/img921/1092/gfROWT.png"
  }

  // Lock Icons
  privateParty = {
    icon: "https://imagizer.imageshack.com/img921/636/gkm7eF.png",
    title: "Private Party"
  }
  
  verifiedParty = {
    icon: "http://imageshack.com/a/img922/41/nHqTVQ.png",
    title: "Verified Users Only"
  }

  // Purpose Icons
  otherParty = {
    icon: "https://imagizer.imageshack.com/img923/7438/UIZUYI.png",
    title: "Purpose: Other"
  }
  progParty = {
    icon: "https://imagizer.imageshack.com/img924/9263/DbhHGj.png",
    title: "Purpose: Progression"
  } 
  
  clearParty = {
    icon: "https://imagizer.imageshack.com/img923/9022/gxp20D.png",
    title: "Purpose: Clear"
  }
  
  oneChestParty = {
    icon: "https://imagizer.imageshack.com/img921/4944/RpdHi5.png",
    title: "Purpose: 0-1 Chest"
  }
  
  twoChestParty = {
    icon: "https://imagizer.imageshack.com/img924/2305/yDf0vv.png",
    title: "Purpose: 2 Chests"
  }
  
  farmParty = {
    icon: "https://imagizer.imageshack.com/img922/7177/gD3qxa.png",
    title: "Purpose: Farm"
  }

  parseParty = {
    icon: "https://imagizer.imageshack.com/img923/9005/GRcLj0.png",
    title: "Purpose: Parse"
  }

  speedParty = {
    icon: "https://imagizer.imageshack.com/img923/4238/4GSUH9.png",
    title: "Purpose: Speedrun"
  }

  // Sync Icons
  fullSync = {
    icon: "https://imagizer.imageshack.com/img922/1995/VBd0hJ.png",
    title: "Full Sync"
  }

  levelSync = {
    icon: "https://imagizer.imageshack.com/img922/1995/VBd0hJ.png",
    title: "Level Sync"
  }

  ilvlSync = {
    icon: "https://imagizer.imageshack.com/img922/1995/VBd0hJ.png",
    title: "Item Level Sync"
  }

  sync = {
    icon: "https://imagizer.imageshack.com/img922/1995/VBd0hJ.png",
    title: "Synced"
  }

  unsync = {
    icon: "https://imagizer.imageshack.com/img921/1092/gfROWT.png",
    title: "Unsynced"
  }

  // Job Icon Backgrounds
  tankBG = {
    icon: "https://imagizer.imageshack.com/img921/5053/ZqErgR.png"
  }

  healerBG = {
    icon: "https://imagizer.imageshack.com/img923/9760/QXNrWD.png"
  }

  dpsBG = {
    icon: "https://imagizer.imageshack.com/img921/510/lPnHQn.png"
  }

  // Job Icons
  jobWAR = {
    icon: "https://imagizer.imageshack.com/img921/2389/jDmn3l.png",
    // icon: "https://imagizer.imageshack.com/img923/6743/MyyfRl.png",
    background: this.tankBG.icon,
    shortName: "WAR",
    name: "Warrior",
    archetype: "TANK"
  }

  jobPLD = {
    icon: "https://imagizer.imageshack.com/img923/7792/6M2Z98.png",
    // icon: "https://imagizer.imageshack.com/img921/1733/eeuDRz.png",
    background: this.tankBG.icon,
    shortName: "PLD",
    name: "Paladin",
    archetype: "TANK"
  }

  jobDRK = {
    icon: "https://imagizer.imageshack.com/img924/7858/MbYriQ.png",
    // icon: "https://imagizer.imageshack.com/img923/3497/VCRJUK.png",
    background: this.tankBG.icon,
    shortName: "DRK",
    name: "Dark Knight",
    archetype: "TANK"
  }

  jobGNB = {
    icon: "https://imagizer.imageshack.com/img924/4720/UmMoX1.png",
    background: this.tankBG.icon,
    shortName: "GNB",
    name: "Gunbreaker",
    archetype: "TANK"
  }

  jobDRG = {
    icon: "https://imagizer.imageshack.com/img923/6941/DkBb3n.png",
    // icon: "https://imagizer.imageshack.com/img923/9862/1G4cLu.png",
    background: this.dpsBG.icon,
    shortName: "DRG",
    name: "Dragoon",
    archetype: "MDPS"
  }

  jobMNK = {
    icon: "https://imagizer.imageshack.com/img924/7632/kQkfSs.png",
    // icon: "https://imagizer.imageshack.com/img923/8657/urIGJM.png",
    background: this.dpsBG.icon,
    shortName: "MNK",
    name: "Monk",
    archetype: "MDPS"
  }

  jobROG = {
    icon: "https://imagizer.imageshack.com/img924/9721/vgRkyP.png",
    // icon: "https://imagizer.imageshack.com/img921/563/YQwxqJ.png",
    background: this.dpsBG.icon,
    shortName: "ROG",
    name: "Rogue",
    archetype: "MDPS"
  }

  jobNIN = {
    icon: "https://imagizer.imageshack.com/img924/3374/yd4sQg.png",
    // icon: "https://imagizer.imageshack.com/img923/6192/auX6ps.png",
    background: this.dpsBG.icon,
    shortName: "NIN",
    name: "Ninja",
    archetype: "MDPS"
  }

  jobSAM = {
    icon: "https://imagizer.imageshack.com/img923/2145/uEThD3.png",
    // icon: "https://imagizer.imageshack.com/img923/3310/MFXEZE.png",
    background: this.dpsBG.icon,
    shortName: "SAM",
    name: "Samurai",
    archetype: "MDPS"
  }

  jobBRD = {
    icon: "https://imagizer.imageshack.com/img924/9849/UAFbv8.png",
    // icon: "https://imagizer.imageshack.com/img921/4922/YEfXDY.png",
    background: this.dpsBG.icon,
    shortName: "BRD",
    name: "Bard",
    archetype: "RDPS"
  }

  jobDNC = {
    icon: "https://imagizer.imageshack.com/img924/1867/MEkP1s.png",
    background: this.dpsBG.icon,
    shortName: "DNC",
    name: "Dancer",
    archetype: "RDPS"
  }

  jobMCH = {
    icon: "https://imagizer.imageshack.com/img921/4551/AfcuVu.png",
    // icon: "https://imagizer.imageshack.com/img923/2240/fzfRXg.png",
    background: this.dpsBG.icon,
    shortName: "MCH",
    name: "Machinist",
    archetype: "RDPS"
  }

  jobRDM = {
    icon: "https://imagizer.imageshack.com/img921/6654/nBXYHS.png",
    // icon: "https://imagizer.imageshack.com/img924/5337/qAk6Rn.png",
    background: this.dpsBG.icon,
    shortName: "RDM",
    name: "Red Mage",
    archetype: "CDPS"
  }

  jobSMN = {
    icon: "https://imagizer.imageshack.com/img923/4978/00F3j7.png",
    // icon: "https://imagizer.imageshack.com/img921/125/OkuvZI.png",
    background: this.dpsBG.icon,
    shortName: "SMN",
    name: "Summoner",
    archetype: "CDPS"
  }

  jobBLM = {
    icon: "https://imagizer.imageshack.com/img923/8850/18nmqz.png",
    // icon: "https://imagizer.imageshack.com/img924/3504/6wpjPM.png",
    background: this.dpsBG.icon,
    shortName: "BLM",
    name: "Black Mage",
    archetype: "CDPS"
  }

  jobBLU = {
    icon: "https://imagizer.imageshack.com/img923/8366/FkBkm8.png",
    // icon: "https://imagizer.imageshack.com/img924/3826/UmaolH.png",
    background: this.dpsBG.icon,
    shortName: "BLU",
    name: "Blue Mage",
    archetype: "CDPS"
  }

  jobWHM = {
    icon: "https://imagizer.imageshack.com/img924/4822/agID3W.png",
    // icon: "https://imagizer.imageshack.com/img924/1004/FWTvVB.png",
    background: this.healerBG.icon,
    shortName: "WHM",
    name: "White Mage",
    archetype: "HEAL"
  }

  jobAST = {
    icon: "https://imagizer.imageshack.com/img924/9874/BrNlHU.png",
    // icon: "https://imagizer.imageshack.com/img924/6241/a2mI6O.png",
    background: this.healerBG.icon,
    shortName: "AST",
    name: "Astrologian",
    archetype: "HEAL"
  }

  jobSCH = {
    icon: "https://imagizer.imageshack.com/img921/5334/Ewwu8C.png",
    // icon: "https://imagizer.imageshack.com/img924/5615/oofmUH.png",
    background: this.healerBG.icon,
    shortName: "SCH",
    name: "Scholar",
    archetype: "HEAL"
  }

  jobMDPS = {
    icon: "https://imagizer.imageshack.com/img921/7589/tavfWi.png",
    // icon: "https://imagizer.imageshack.com/img921/6093/sysH1r.png",
    background: this.dpsBG.icon,
    shortName: "MDPS",
    name: "Melee DPS",
    archetype: "DPS"
  }

  jobRDPS = {
    icon: "https://imagizer.imageshack.com/img924/9291/gHngbu.png",
    // icon: "https://imagizer.imageshack.com/img921/5514/rysBJb.png",
    background: this.dpsBG.icon,
    shortName: "RDPS",
    name: "Ranged DPS",
    archetype: "DPS"
  }

  jobCDPS = {
    icon: "https://imagizer.imageshack.com/img924/1919/9KFszC.png",
    // icon: "https://imagizer.imageshack.com/img923/1631/PjroPj.png",
    background: this.dpsBG.icon,
    shortName: "CDPS",
    name: "Caster DPS",
    archetype: "DPS"
  }

  jobTANK = {
    icon: "https://imagizer.imageshack.com/img921/5476/mrD4ur.png",
    background: this.tankBG.icon,
    shortName: "TANK",
    name: "Tank",
    archetype: ""
  }

  jobHEAL = {
    icon: "https://imagizer.imageshack.com/img921/5231/2qbx7o.png",
    background: this.healerBG.icon,
    shortName: "HEAL",
    name: "Healer",
    archetype: ""
  }

  jobDPS = {
    icon: "https://imagizer.imageshack.com/img924/6339/BmKpqk.png",
    background: this.dpsBG.icon,
    shortName: "DPS",
    name: "DPS",
    archetype: ""
  }

  // Other Slot Icons
  slotLocked = {
    icon: "",
    background: "",
    shortName: "Locked",
    name: "Locked",
    archetype: ""
  }

  slotAny = {
    icon: "",
    background: "",
    shortName: "Any",
    name: "Any",
    archetype: ""
  }

  // Object Getter
  get (str: string) : {icon: string} {
    // TODO: Map this
    switch(str)
    {
      case "Unverified Slot Flair": { return this.unverifiedSlotFlair; }
      case "Verified Slot Flair": { return this.verifiedSlotFlair; }
      case "Adventurer Slot Flair": { return this.adventurerSlotFlair; }
      case "Raider Slot Flair": { return this.raiderSlotFlair; }
      case "Legend Slot Flair": { return this.legendSlotFlair; }

      case "Slot Highlight": { return this.slotHighlight; }
      case "Party Leader": { return this.partyLeader; }
      case "Verified Users Only": { return this.verifiedParty; }
      case "Open to All Users": { return this.empty; }
      case "empty": { return this.empty; }
      case "Slot Filled": { return this.slotFilled; }
      case "Speed Run": { return this.speedParty; }
      case "Progression": { return this.progParty; }
      case "0-1 Chest": { return this.oneChestParty; }
      case "2 Chest": { return this.twoChestParty; }
      case "Farm": { return this.farmParty; }
      case "Parse": { return this.parseParty; }
      case "Other": { return this.otherParty; }
      case "Clear": { return this.clearParty; }
      case "Unsynced": { return this.unsync; }
      case "Synced": { return this.sync; }
      case "Level": { return this.levelSync; }
      case "Item": { return this.ilvlSync; }
      case "Full": { return this.fullSync; }
      case "tankBG": { return this.tankBG; }
      case "healerBG": { return this.healerBG; }
      case "dpsBG": { return this.dpsBG; }
      case "WAR": { return this.jobWAR; }
      case "PLD": { return this.jobPLD; }
      case "DRK": { return this.jobDRK; }
      case "GNB": { return this.jobGNB; }
      case "DRG": { return this.jobDRG; }
      case "MNK": { return this.jobMNK; }
      case "NIN": { return this.jobNIN; }
      case "SAM": { return this.jobSAM; }
      case "BRD": { return this.jobBRD; }
      case "MCH": { return this.jobMCH; }
      case "DNC": { return this.jobDNC; }
      case "RDM": { return this.jobRDM; }
      case "SMN": { return this.jobSMN; }
      case "BLM": { return this.jobBLM; }
      case "BLU": { return this.jobBLU; }
      case "WHM": { return this.jobWHM; }
      case "AST": { return this.jobAST; }
      case "SCH": { return this.jobSCH; }
      case "DPS": { return this.jobDPS; }
      case "MDPS": { return this.jobMDPS; }
      case "RDPS": { return this.jobRDPS; }
      case "CDPS": { return this.jobCDPS; }
      case "TANK": { return this.jobTANK; }
      case "HEAL": { return this.jobHEAL; }
      case "SlotFilled": { return this.slotFilled; }
      case "instanceIconGradient": { return this.instanceIconGradient; }
      default: { return this.empty; }
    }
  };
}