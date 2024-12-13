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

function getTotalStats (level) {
  let totalStats = 15+747*(level-1)/(100-1);
  return totalStats;
}
  
