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
        basePrimaryStats.strength += baseStats * 0.27;
        basePrimaryStats.intellect += baseStats * 0.05;
        basePrimaryStats.endurance += baseStats * 0.30;
        basePrimaryStats.dexterity += baseStats * 0.22;
        basePrimaryStats.wisdom += baseStats * 0.10;
        basePrimaryStats.luck += baseStats * 0.06;
        break;
    
    case 'Dodge Melee':
        basePrimaryStats.strength += baseStats * 0.20;
        basePrimaryStats.intellect += baseStats * 0.05;
        basePrimaryStats.endurance += baseStats * 0.22;
        basePrimaryStats.dexterity += baseStats * 0.33;
        basePrimaryStats.wisdom += baseStats * 0.10;
        basePrimaryStats.luck += baseStats * 0.10;
        break;

    case 'Power Melee':
        basePrimaryStats.strength += baseStats * 0.30;
        basePrimaryStats.intellect += baseStats * 0.02;
        basePrimaryStats.endurance += baseStats * 0.18;
        basePrimaryStats.dexterity += baseStats * 0.30;
        basePrimaryStats.wisdom += baseStats * 0.06;
        basePrimaryStats.luck += baseStats * 0.14;
        break;

    case 'Offensive Caster':
        basePrimaryStats.strength += baseStats * 0.06;
        basePrimaryStats.intellect += baseStats * 0.33;
        basePrimaryStats.endurance += baseStats * 0.20;
        basePrimaryStats.dexterity += baseStats * 0.11;
        basePrimaryStats.wisdom += baseStats * 0.15;
        basePrimaryStats.luck += baseStats * 0.15;
        break;

    case 'Defensive Caster':
        basePrimaryStats.strength += baseStats * 0.08;
        basePrimaryStats.intellect += baseStats * 0.30;
        basePrimaryStats.endurance += baseStats * 0.27;
        basePrimaryStats.dexterity += baseStats * 0.10;
        basePrimaryStats.wisdom += baseStats * 0.10;
        basePrimaryStats.luck += baseStats * 0.15;
        break;

    case 'Power Caster':
        basePrimaryStats.strength += baseStats * 0.06;
        basePrimaryStats.intellect += baseStats * 0.28;
        basePrimaryStats.endurance += baseStats * 0.23;
        basePrimaryStats.dexterity += baseStats * 0.05;
        basePrimaryStats.wisdom += baseStats * 0.28;
        basePrimaryStats.luck += baseStats * 0.10;
        break;

    case 'Full Hybrid':
        basePrimaryStats.strength += baseStats * 0.24;
        basePrimaryStats.intellect += baseStats * 0.24;
        basePrimaryStats.endurance += baseStats * 0.20;
        basePrimaryStats.dexterity += baseStats * 0.20;
        basePrimaryStats.wisdom += baseStats * 0.07;
        basePrimaryStats.luck += baseStats * 0.05;
        break;

    case 'basePrimaryStats.luck Hybrid':
        basePrimaryStats.strength += baseStats * 0.22;
        basePrimaryStats.intellect += baseStats * 0.08;
        basePrimaryStats.endurance += baseStats * 0.18;
        basePrimaryStats.dexterity += baseStats * 0.21;
        basePrimaryStats.wisdom += baseStats * 0.08;
        basePrimaryStats.luck += baseStats * 0.23;
        break;

    default:
        console.log('Class model not recognized.');
        break;
  }

  return basePrimaryStats;
}
