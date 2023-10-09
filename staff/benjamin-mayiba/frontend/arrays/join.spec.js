console.log('TEST join')

console.log("CASE for ['Fire', 'Air', 'Water'] join ','  results in Fire,Air,Water")
console.log(join(['Fire', 'Air', 'Water'],','))
// Fire,Air,Water

console.log("CASE for ['Fire', 'Air', 'Water'] join '/'  results in Fire/Air/Water ")
console.log(join(['Fire', 'Air', 'Water'],'/'))
// Fire/Air/Water 

console.log("CASE for ['Fire', 'Air', 'Water'] join ''  results in FireAirWater ")
console.log(join(['Fire', 'Air', 'Water'],''))
// FireAirWater

console.log("CASE for ['Fire', 'Air', 'Water'] join ' '  results in Fire Air Water ")
console.log(join(['Fire', 'Air', 'Water'],' '))
// Fire Air Water
