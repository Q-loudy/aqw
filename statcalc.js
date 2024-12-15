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

// 8 class models
const classModelStatsDist = {
    "Tank Melee": {
        strength: 0.27,
        intellect: 0.05,
        endurance: 0.30,
        dexterity: 0.22,
        wisdom: 0.10,
        luck: 0.06
    },
    "Dodge Melee": {
        strength: 0.20,
        intellect: 0.05,
        endurance: 0.22,
        dexterity: 0.33,
        wisdom: 0.10,
        luck: 0.10
    },
    "Power Melee": {
        strength: 0.30,
        intellect: 0.02,
        endurance: 0.18,
        dexterity: 0.30,
        wisdom: 0.06,
        luck: 0.14
    },
    "Offensive Caster": {
        strength: 0.06,
        intellect: 0.33,
        endurance: 0.20,
        dexterity: 0.11,
        wisdom: 0.15,
        luck: 0.15
    },
    "Defensive Caster": {
        strength: 0.08,
        intellect: 0.30,
        endurance: 0.27,
        dexterity: 0.10,
        wisdom: 0.10,
        luck: 0.15
    },
    "Power Caster": {
        strength: 0.06,
        intellect: 0.28,
        endurance: 0.23,
        dexterity: 0.05,
        wisdom: 0.28,
        luck: 0.10
    },
    "Full Hybrid": {
        strength: 0.24,
        intellect: 0.24,
        endurance: 0.20,
        dexterity: 0.20,
        wisdom: 0.07,
        luck: 0.05
    },
    "Luck Hybrid": {
        strength: 0.22,
        intellect: 0.08,
        endurance: 0.18,
        dexterity: 0.21,
        wisdom: 0.08,
        luck: 0.23
    }
};

function getBasePrimaryStats(level, classModel) {
    const basePrimaryStats = {
        strength: 0,
        intellect: 0,
        endurance: 0,
        dexterity: 0,
        wisdom: 0,
        luck: 0
    };

    const baseStats = getTotalBasePrimaryStats(level); // Assuming this function exists

    // Fetch the multipliers for the selected class model
    const multipliers = classModelStatsDist[classModel];

    if (!multipliers) {
        throw new Error(`Class model '${classModel}' not found in the lookup table`);
    }

    // Apply the multipliers to calculate stats
    for (const stat in multipliers) {
        basePrimaryStats[stat] += Math.round(baseStats * multipliers[stat]);
    }

    return basePrimaryStats;
}
  
function getEnhPrimaryStats(enhancements) {
  let enhPrimaryStats = {
    strength: 0,
    intellect: 0,
    endurance: 0,
    dexterity: 0,
    wisdom: 0,
    luck: 0
  }

  

  
  return enhPrimaryStats
}
