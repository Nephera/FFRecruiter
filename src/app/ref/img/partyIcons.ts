import { Injectable } from '@angular/core';

@Injectable()
export class partyIcons {
  // Accent and Overlay Icons
  highlight = {
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

  // Lock Icons
  privateParty = {
    icon: "https://imagizer.imageshack.com/img921/636/gkm7eF.png",
    title: "Private Party"
  }
  
  verifiedParty = {
    icon: "https://imagizer.imageshack.com/img924/3685/sQUzot.png",
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
    icon: "",
    title: "Full Sync"
  }

  levelSync = {
    icon: "",
    title: "Level Sync"
  }

  ilvlSync = {
    icon: "",
    title: "Item Level Sync"
  }

  unsync = {
    icon: "",
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

  jobGLA = {
    icon: "https://imagizer.imageshack.com/img921/6619/Q9mNGE.png",
    // icon: "https://imagizer.imageshack.com/img924/8559/NFcSGY.png",
    background: this.tankBG.icon,
    shortName: "GLA",
    name: "Gladiator",
    archetype: "TANK"
  }

  jobMRD = {
    icon: "https://imagizer.imageshack.com/img921/5986/fcNORZ.png",
    // icon: "https://imagizer.imageshack.com/img921/7671/VLZFe5.png",
    background: this.tankBG.icon,
    shortName: "MRD",
    name: "Marauder",
    archetype: "TANK"
  }

  jobLNC = {
    icon: "https://imagizer.imageshack.com/img924/1105/9OaZ2o.png",
    // icon: "https://imagizer.imageshack.com/img921/9734/cpQGEs.png",
    background: this.dpsBG.icon,
    shortName: "LNC",
    name: "Lancer",
    archetype: "MDPS"
  }

  jobDRG = {
    icon: "https://imagizer.imageshack.com/img923/6941/DkBb3n.png",
    // icon: "https://imagizer.imageshack.com/img923/9862/1G4cLu.png",
    background: this.dpsBG.icon,
    shortName: "DRG",
    name: "Dragoon",
    archetype: "MDPS"
  }

  jobPGL = {
    icon: "https://imagizer.imageshack.com/img921/1570/eEUCAZ.png",
    // icon: "https://imagizer.imageshack.com/img921/9246/8o2PSo.png",
    background: this.dpsBG.icon,
    shortName: "PGL",
    name: "Pugilist",
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

  jobARC = {
    icon: "https://imagizer.imageshack.com/img924/427/DCp6Yn.png",
    // icon: "https://imagizer.imageshack.com/img924/1874/smhFch.png",
    background: this.dpsBG.icon,
    shortName: "ARC",
    name: "Archer",
    archetype: "RDPS"
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

  jobACN = {
    icon: "https://imagizer.imageshack.com/img921/6232/BHTwOq.png",
    // icon: "https://imagizer.imageshack.com/img921/7776/TZrpKQ.png",
    background: this.dpsBG.icon,
    shortName: "ACN",
    name: "Arcanist",
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

  jobTHM = {
    icon: "https://imagizer.imageshack.com/img924/6461/4DAqQZ.png",
    // icon: "https://imagizer.imageshack.com/img924/5812/L5Xl0E.png",
    background: this.dpsBG.icon,
    shortName: "THM",
    name: "Thaumaturge",
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

  jobCNJ = {
    icon: "https://imagizer.imageshack.com/img923/1799/eRIWfi.png",
    // icon: "https://imagizer.imageshack.com/img924/6933/HE04CF.png",
    background: this.healerBG.icon,
    shortName: "CNJ",
    name: "Conjurer",
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
  get (str: string){
    switch(str)
    {
      case "Speed Run": { return this.speedParty; }
      case "Progression": { return this.progParty; }
      case "0-1 Chest": { return this.oneChestParty; }
      case "2 Chest": { return this.twoChestParty; }
      case "Farm": { return this.farmParty; }
      case "Parse": { return this.parseParty; }
      case "Other": { return this.otherParty; }
      case "Clear": { return this.clearParty; }
      case "Unsynced": { return this.unsync; }
      case "Level Synced": { return this.levelSync; }
      case "iLvl Synced": { return this.ilvlSync; }
      case "Full Sync": { return this.fullSync; }
      case "tankBG": { return this.tankBG; }
      case "healerBG": { return this.healerBG; }
      case "dpsBG": { return this.dpsBG; }
      case "WAR": { return this.jobWAR; }
      case "PLD": { return this.jobPLD; }
      case "DRK": { return this.jobDRK; }
      case "GNB": { return this.jobGNB; }
      case "GLA": { return this.jobGLA; }
      case "MRD": { return this.jobMRD; }
      case "LNC": { return this.jobLNC; }
      case "DRG": { return this.jobDRG; }
      case "PGL": { return this.jobPGL; }
      case "MNK": { return this.jobMNK; }
      case "ROG": { return this.jobROG; }
      case "NIN": { return this.jobNIN; }
      case "SAM": { return this.jobSAM; }
      case "ARC": { return this.jobARC; }
      case "BRD": { return this.jobBRD; }
      case "MCH": { return this.jobMCH; }
      case "RDM": { return this.jobRDM; }
      case "ACN": { return this.jobACN; }
      case "SMN": { return this.jobSMN; }
      case "THM": { return this.jobTHM; }
      case "BLM": { return this.jobBLM; }
      case "BLU": { return this.jobBLU; }
      case "CNJ": { return this.jobCNJ; }
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
    }
  };
}