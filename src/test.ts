import { Organism } from "./types/interfaces"
import { raceBirman } from "./genetics/birman.race"
import { raceSimpleBirman } from "./genetics/simple.birman.race"
import { generateOffsprings } from "./services/offsprings.services"
import { encodeGenotype, getPhenotype } from "./services/organism.services"
import { describe, getPhenotypeStats } from "./services/phenotype.services"

const gatine: Organism = {
    genotype: {
        'colour': ['B', 'B'],
        'dilution': ['D', 'D'],
        'red': ['O', 'O'],
        'silver': ['i', 'i'],
        'tabby': ['A', 'A'],
    },
    race: raceBirman,
    sex: "female"
}

const maleGatine: Organism = {
    genotype: {
        'colour': ['b', 'b'],
        'dilution': ['D', 'd'],
        'red': ['o', '-'],
        'silver': ['i', 'i'],
        'tabby': ['A', 'a'],
    },
    race: raceBirman,
    sex: "female"
}

const simpleGatine: Organism = {
    genotype: {
        'colour': ['B', 'B'],
        'dilution': ['D', 'D'],
        'red': ['O', 'O']
    },
    race: raceSimpleBirman,
    sex: "female"
}
const simpleMaleGatine: Organism = {
    genotype: {
        'colour': ['B', 'B'],
        'dilution': ['D', 'd'],
        'red': ['O', '-']
    },
    race: raceSimpleBirman,
    sex: "male"
}

const offsprings = generateOffsprings(simpleMaleGatine, simpleGatine).map(offspring => getPhenotype(offspring))
console.log(encodeGenotype(simpleMaleGatine))
console.log(encodeGenotype(simpleGatine))
let result = []
let sum = getPhenotypeStats(raceSimpleBirman, offsprings)
for (const key in sum) {
    result.push([sum[key].sex, describe(raceBirman, sum[key].phenotype), sum[key].ratio])
}
console.table(result);


console.log(encodeGenotype(maleGatine));
console.log(encodeGenotype(gatine))
result = [];
sum = getPhenotypeStats(
    raceBirman,
    generateOffsprings(maleGatine, gatine).map(offspring => getPhenotype(offspring))
);
for (const key in sum) {
    result.push([sum[key].sex, describe(raceBirman, sum[key].phenotype), sum[key].ratio])
}
console.table(result)