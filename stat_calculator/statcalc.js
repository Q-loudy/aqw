// statcalc.js

function getBaseHP(level)  {
  let baseHP = ((level - 1) / (100 - 1)) ** 0.66 * 1640 + 360;
  return baseHP;
}  

function getWDPS(level) {
  let WDPS = Math.round(getBaseHP(level)/20*0.85);
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

// Store base primary stat distributions for all class models 
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

// Store primary stat distributions for all enhancements
// 7 regular + depth + forge + 4 helm = 13 enhancements
const EnhStatDist = {
    Fighter: {
        strength: 0.44,
        intellect: 0,
        endurance: 0.43,
        dexterity: 0.13,
        wisdom: 0,
        luck: 0
    },
    Thief: {
        strength: 0.30,
        intellect: 0,
        endurance: 0.25,
        dexterity: 0.45,
        wisdom: 0,
        luck: 0
    },
    Wizard: {
        strength: 0,
        intellect: 0.50,
        endurance: 0.10,
        dexterity: 0,
        wisdom: 0.20,
        luck: 0.20
    },
    Healer: {
        strength: 0,
        intellect: 0.45,
        endurance: 0.40,
        dexterity: 0,
        wisdom: 0.15,
        luck: 0
    },
    Hybrid: {
        strength: 0.28,
        intellect: 0.27,
        endurance: 0.25,
        dexterity: 0.20,
        wisdom: 0,
        luck: 0
    },
    Lucky: {
        strength: 0.10,
        intellect: 0.10,
        endurance: 0.10,
        dexterity: 0.10,
        wisdom: 0.10,
        luck: 0.50
    },
    Spellbreaker: {
        strength: 0,
        intellect: 0.40,
        endurance: 0.20,
        dexterity: 0,
        wisdom: 0.30,
        luck: 0.10
    },
    Depth: {
        strength: 0,
        intellect: 0.50,
        endurance: 0,
        dexterity: 0,
        wisdom: 0,
        luck: 0.50
    },
    Forge: {
        strength: 0.25,
        intellect: 0.25,
        endurance: 0,
        dexterity: 0,
        wisdom: 0,
        luck: 0.50
    },

    // store ratios of enh stats at lvl 100 for helm forge
    Vim: {
        strength: 15/152,
        intellect: 0,
        endurance: -137/152,
        dexterity: 198/152,
        wisdom: 0,
        luck: 76/152
    },
    Examen: {
        strength: 0,
        intellect: 15/152,
        endurance: -137/152,
        dexterity: 0,
        wisdom: 198/152,
        luck: 76/152
    },
    Anima: {
        strength: 204/152,
        intellect: 24/152,
        endurance: -136/152,
        dexterity: 36/152,
        wisdom: 24/152,
        luck: 0
    },
    Pneuma: {
        strength: 37/152,
        intellect: 179/152,
        endurance: -136/152,
        dexterity: 36/152,
        wisdom: 36/152,
        luck: 0
    }
};

function getEnhPrimaryStats(enhancements) {
    // Define the resulting object for enhanced primary stats
    let enhPrimaryStats = {
      strength: 0,
      intellect: 0,
      endurance: 0,
      dexterity: 0,
      wisdom: 0,
      luck: 0
    };
  
    // Define the formula constants
    const baseFactor = 560;
    const baseAdd = 12;
  
    // Define enhancement types and their multipliers
    const enhTypes = [
      { type: "weaponEnh", lvl: "weaponEnhLvl", mod: "weaponModLvl", multiplier: 0.33 },
      { type: "armorEnh", lvl: "armorEnhLvl", mod: "armorModLvl", multiplier: 0.25 },
      { type: "helmEnh", lvl: "helmEnhLvl", mod: "helmModLvl", multiplier: 0.25 },
      { type: "capeEnh", lvl: "capeEnhLvl", mod: "capeModLvl", multiplier: 0.2 }
    ];
  
    // Loop through each enhancement type
    enhTypes.forEach(({ type, lvl, mod, multiplier }) => {
      const enhType = enhancements[type];
      const enhLvl = enhancements[lvl];
      const modLvl = enhancements[mod];
  
      // Lookup stats distribution for the enhancement type
      const statDist = EnhStatDist[enhType];
      if (!statDist) {
        console.error(`Enhancement type ${enhType} not found in EnhStatDist.`);
        return;
      }
  
      // Calculate the base enhancement factor
      const baseEnhFactor = Math.round(((Number(enhLvl) + Number(modLvl) - 1) / (100 - 1)) * baseFactor + baseAdd);
      
      // Add calculated stats to enhPrimaryStats
      enhPrimaryStats.strength += Math.round(Math.round(baseEnhFactor * multiplier) * (statDist.strength || 0));
      enhPrimaryStats.intellect += Math.round(Math.round(baseEnhFactor * multiplier) * (statDist.intellect || 0));
      enhPrimaryStats.endurance += Math.round(Math.round(baseEnhFactor * multiplier) * (statDist.endurance || 0));
      enhPrimaryStats.dexterity += Math.round(Math.round(baseEnhFactor * multiplier) * (statDist.dexterity || 0));
      enhPrimaryStats.wisdom += Math.round(Math.round(baseEnhFactor * multiplier) * (statDist.wisdom || 0));
      enhPrimaryStats.luck += Math.round(Math.round(baseEnhFactor * multiplier) * (statDist.luck || 0));
    });
  
    // Return the final stats
    return enhPrimaryStats;
  }

const secondaryStatsDist = {
    "Tank Melee": {
        attackPower: { strength: 2, luck: 0.7 },
        spellPower: { intellect: 2 },
        hitChance: { dexterity: 0.2, luck: 0.1 },
        haste: { dexterity: 0.3, luck: 0.1 },
        critChance: { strength: 0.4, luck: 0.2 },
        critMod: { luck: 5 },
        evasion: { dexterity: 0.3, wisdom: 0.3, luck: 0.1 }
    },
    "Dodge Melee": {
        attackPower: { strength: 2, luck: 0.7 },
        spellPower: { intellect: 2 },
        hitChance: { dexterity: 0.2, luck: 0.1 },
        haste: { dexterity: 0.5, luck: 0.1 },
        critChance: { strength: 0.4, luck: 0.2 },
        critMod: { luck: 5 },
        evasion: { dexterity: 0.5, wisdom: 0.3, luck: 0.1 }
    },
    "Power Melee": {
        attackPower: { strength: 2, luck: 0.7 },
        spellPower: { intellect: 2 },
        hitChance: { dexterity: 0.2, luck: 0.1 },
        haste: { dexterity: 0.5, luck: 0.1 },
        critChance: { strength: 0.7, luck: 0.2 },
        critMod: { luck: 5 },
        evasion: { dexterity: 0.3, wisdom: 0.3, luck: 0.1 }
    },
    "Offensive Caster": {
        attackPower: { strength: 2 },
        spellPower: { intellect: 2, luck: 0.7 },
        hitChance: { wisdom: 0.2, luck: 0.1 },
        haste: { intellect: 0.3, luck: 0.1 },
        critChance: { wisdom: 0.7, luck: 0.2 },
        critMod: { luck: 5 },
        evasion: { dexterity: 0.3, wisdom: 0.3, luck: 0.1 },
        magOut: { intellect: 1 }
    },
    "Defensive Caster": {
        attackPower: { strength: 2 },
        spellPower: { intellect: 2, luck: 0.7 },
        hitChance: { wisdom: 0.2, luck: 0.1 },
        haste: { intellect: 0.5, luck: 0.1 },
        critChance: { wisdom: 0.4, luck: 0.2 },
        critMod: { luck: 5 },
        evasion: { dexterity: 0.3, wisdom: 0.3, luck: 0.1 },
        magOut: { intellect: 1 }
    },
    "Power Caster": {
        attackPower: { strength: 2 },
        spellPower: { intellect: 2, luck: 0.7 },
        hitChance: { wisdom: 0.2, luck: 0.1 },
        haste: { intellect: 0.3, luck: 0.1 },
        critChance: { wisdom: 0.4, luck: 0.2 },
        critMod: { luck: 5 },
        evasion: { dexterity: 0.3, wisdom: 0.3, luck: 0.1 },
        magOut: { intellect: 1 }
    },
    "Full Hybrid": {
        attackPower: { strength: 2, luck: 0.7 },
        spellPower: { intellect: 2, luck: 0.7 },
        hitChance: { dexterity: 0.2, luck: 0.1 },
        haste: { intellect: 0.3, dexterity: 0.3, luck: 0.1 },
        critChance: { strength: 0.4, luck: 0.2 },
        critMod: { luck: 5 },
        evasion: { dexterity: 0.5, wisdom: 0.3, luck: 0.1 },
        magOut: { intellect: 1 }
    },
    "Luck Hybrid": {
        attackPower: { strength: 1.4, luck: 1 },
        spellPower: { intellect: 1.4, luck: 1 },
        hitChance: { dexterity: 0.2, wisdom: 0.2, luck: 0.1 },
        haste: { intellect: 0.3, dexterity: 0.3, luck: 0.3 },
        critChance: { strength: 0.4, wisdom: 0.4, luck: 0.3 },
        critMod: { luck: 2.5 },
        evasion: { dexterity: 0.3, wisdom: 0.3, luck: 0.25 }
    }
};    

function getSecondaryStats(level, classModel, primaryStats) {
    let secondaryStats = {
        attackPower: 0,
        spellPower: 0,
        health: primaryStats.endurance * 5,
        hitChance: 0,
        haste: 0,
        critChance: 0,
        critMod: 0,
        evasion: 0,
        magIn: primaryStats.intellect * -1,
        magOut: 0
    };

  const multipliers = secondaryStatsDist[classModel]; 

  // calculate secondary stats
  for (const [statName, contributions] of Object.entries(multipliers)) {
    secondaryStats[statName] = Object.entries(contributions).reduce(
        (sum, [primaryStat, multiplier]) => sum + (primaryStats[primaryStat] || 0) * multiplier, 0);
  }

  // apply base values and efficiency
  baseHP = getBaseHP(level);
  efficiency = getEfficiency(level);
  
  secondaryStats.attackPower = Math.round(secondaryStats.attackPower);
  secondaryStats.spellPower = Math.round(secondaryStats.spellPower);
  secondaryStats.health = Math.round(baseHP + secondaryStats.health);
  
  secondaryStats.hitChance = Math.round((90 + secondaryStats.hitChance * efficiency) * 100) / 100;
  secondaryStats.haste = Math.round(secondaryStats.haste * efficiency * 100) / 100;
  secondaryStats.critChance = Math.round((5 + secondaryStats.critChance * efficiency) * 100) / 100;
  secondaryStats.critMod = Math.round((150 + secondaryStats.critMod * efficiency) * 100) / 100;
  secondaryStats.evasion = Math.round((4 + secondaryStats.evasion * efficiency) * 100) / 100;
  secondaryStats.magIn = Math.round(secondaryStats.magIn * efficiency * 100) / 100;
  secondaryStats.magOut = Math.round(secondaryStats.magOut * efficiency * 100) / 100;

  return secondaryStats;
}
