// statcalc.js

function getBaseHP (level)  {
  let baseHP = ((level - 1) / (100 - 1)) ** 0.66 * 1640 + 360;
  return baseHP;
}  

function getWDPS (level) {
  let WDPS = getBaseHP(level)/20*0.85;
  return WDPS;
}

function getEfficiency (level) {
  let efficiency = 16000/63/getBaseHP(level);
  return efficiency;
}

function calculateEnhancement(level, selectedEnhancement) {
  let calculatedStat = level * 10; // Basic calculation for level

  // Modify stat based on the selected enhancement type
  switch (selectedEnhancement) {
    case 'Lucky':
      calculatedStat += 5;
      break;
    case 'Fighter':
      calculatedStat += 10;
      break;
    case 'Wizard':
      calculatedStat += 7;
      break;
    case 'Healer':
      calculatedStat += 3;
      break;
    case 'Thief':
      calculatedStat += 8;
      break;
    default:
      break;
  }

  return calculatedStat;
}
