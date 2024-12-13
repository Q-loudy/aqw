// statcalc.js

function getBaseHP(level)  {
  let baseHP = ((level - 1) / (100 - 1)) ** 0.66 * 1640 + 360;
  return baseHP;
}  

function getWDPS(level) {
  let WDPS = getBaseHP(level)/20*0.85;
  return WDPS;
}

function getEfficiency(level) {
  let efficiency = 16000/63/getBaseHP(level);
  return efficiency;
}

function getTotalBasePrimaryStats(level) {
  let totalBasePrimaryStats = 15+747*(level-1)/(100-1);
  return totalBasePrimaryStats;
}
  
function getBasePrimaryStats(level, classModel) {
  let basePrimaryStats = {
    strength: 0,
    intellect: 0,
    endurance: 0,
    dexterity: 0,
    wisdom: 0,
    luck: 0
  };

  let baseStats = getTotalBasePrimaryStats(level);  // Assuming this function returns the base value for each stat

  switch (classModel) {
    case 'Tank Melee':
        strength += baseStats * 0.27;
        intellect += baseStats * 0.05;
        endurance += baseStats * 0.30;
        dexterity += baseStats * 0.22;
        wisdom += baseStats * 0.10;
        luck += baseStats * 0.06;
        break;
    
    case 'Dodge Melee':
        strength += baseStats * 0.20;
        intellect += baseStats * 0.05;
        endurance += baseStats * 0.22;
        dexterity += baseStats * 0.33;
        wisdom += baseStats * 0.10;
        luck += baseStats * 0.10;
        break;

    case 'Power Melee':
        strength += baseStats * 0.30;
        intellect += baseStats * 0.02;
        endurance += baseStats * 0.18;
        dexterity += baseStats * 0.30;
        wisdom += baseStats * 0.06;
        luck += baseStats * 0.14;
        break;

    case 'Offensive Caster':
        strength += baseStats * 0.06;
        intellect += baseStats * 0.33;
        endurance += baseStats * 0.20;
        dexterity += baseStats * 0.11;
        wisdom += baseStats * 0.15;
        luck += baseStats * 0.15;
        break;

    case 'Defensive Caster':
        strength += baseStats * 0.08;
        intellect += baseStats * 0.30;
        endurance += baseStats * 0.27;
        dexterity += baseStats * 0.10;
        wisdom += baseStats * 0.10;
        luck += baseStats * 0.15;
        break;

    case 'Power Caster':
        strength += baseStats * 0.06;
        intellect += baseStats * 0.28;
        endurance += baseStats * 0.23;
        dexterity += baseStats * 0.05;
        wisdom += baseStats * 0.28;
        luck += baseStats * 0.10;
        break;

    case 'Full Hybrid':
        strength += baseStats * 0.24;
        intellect += baseStats * 0.24;
        endurance += baseStats * 0.20;
        dexterity += baseStats * 0.20;
        wisdom += baseStats * 0.07;
        luck += baseStats * 0.05;
        break;

    case 'Luck Hybrid':
        strength += baseStats * 0.22;
        intellect += baseStats * 0.08;
        endurance += baseStats * 0.18;
        dexterity += baseStats * 0.21;
        wisdom += baseStats * 0.08;
        luck += baseStats * 0.23;
        break;

    default:
        console.log('Class model not recognized.');
        break;
  }

  return basePrimaryStats;

  // Return the calculated stats
  return {
      strength: strength,
      intellect: intellect,
      endurance: endurance,
      dexterity: dexterity,
      wisdom: wisdom,
      luck: luck
  };
}
