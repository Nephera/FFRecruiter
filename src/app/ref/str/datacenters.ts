import { Injectable } from '@angular/core';

@Injectable()
export class datacenters {
  // Object Getter
  getDatacenter (str: string){
    //console.log("Returning: " + str);
    switch(str)
    {
      // North America
      case "Adamantoise": { return "Aether"; }
      case "Balmung": { return "Primal"; }
      case "Behemoth": { return "Primal"; }
      case "Brynhildr": { return "Crystal"; }
      case "Cactuar": { return "Aether"; }
      case "Coeurl": { return "Crystal"; }
      case "Diabolos": { return "Crystal"; }
      case "Excalibur": { return "Primal"; }
      case "Exodus": { return "Primal"; }
      case "Faerie": { return "Aether"; }
      case "Famfrit": { return "Primal"; }
      case "Gilgamesh": { return "Aether"; }
      case "Goblin": { return "Crystal"; }
      case "Hyperion": { return "Primal"; }
      case "Jenova": { return "Jenova"; }
      case "Lamia": { return "Primal"; }
      case "Leviathan": { return "Primal"; }
      case "Malboro": { return "Crystal"; }
      case "Mateus": { return "Crystal"; }
      case "Midgardsormr": { return "Aether"; }
      case "Sargatanas": { return "Aether"; }
      case "Siren": { return "Aether"; }
      case "Ultros": { return "Primal"; }
      case "Zalera": { return "Crystal"; }

      // Europe
      case "Cerberus": { return "Chaos"; }
      case "Lich": { return "Light"; }
      case "Louisoix": { return "Chaos"; }
      case "Moogle": { return "Chaos"; }
      case "Odin": { return "Light"; }
      case "Omega": { return "Chaos"}
      case "Phoenix": { return "Light"; }
      case "Ragnarok": { return "Chaos"; }
      case "Shiva": { return "Light"; }
      case "Spriggan": { return "Chaos"; }
      case "Twintania": { return "Light"; }
      case "Zodiark": { return "Light"; }

      // Japan

      case "Aegis": { return "Elemental"; }
      case "Atomos": { return "Elemental"; }
      case "Carbuncle": { return "Elemental"; }
      case "Garuda": { return "Elemental"; }
      case "Gungnir": { return "Elemental"; }
      case "Kujata": { return "Elemental"; }
      case "Ramuh": { return "Elemental"; }
      case "Tonberry": { return "Elemental"; }
      case "Typhon": { return "Elemental"; }
      case "Unicorn": { return "Elemental"; }
      case "Anima": { return "Mana"; }
      case "Asura": { return "Mana"; }
      case "Belias": { return "Mana"; }
      case "Chocobo": { return "Mana"; }
      case "Hades": { return "Mana"; }
      case "Ixion": { return "Mana"; }
      case "Mandragora": { return "Mana"; }
      case "Masamune": { return "Mana"; }
      case "Pandaemonium": { return "Mana"; }
      case "Shinryu": { return "Mana"; }
      case "Titan": { return "Mana"; }
      case "Alexander": { return "Gaia"; }
      case "Bahamut": { return "Gaia"; }
      case "Durandal": { return "Gaia"; }
      case "Fenrir": { return "Gaia"; }
      case "Ifrit": { return "Gaia"; }
      case "Ridill": { return "Gaia"; }
      case "Tiamat": { return "Gaia"; }
      case "Ultima": { return "Gaia"; }
      case "Valefor": { return "Gaia"; }
      case "Yojimbo": { return "Gaia"; }
      case "Zeromus": { return "Gaia"; }
    }
  };
}