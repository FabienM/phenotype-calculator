import { Race } from "../types/interfaces"
import { AllelePair, GeneCode, Phenotype, PhenotypeIndex, PossibleGenes, Sex, TraitValue } from "../types/types"
import { allelePairEquals, getAlleleCombinations } from "./genotype.services"

function hashPhenotype(phenotype: Phenotype): string {
    let hash = ""
    for (const trait in phenotype) {
        hash = `${hash}-${phenotype[trait]}`
    }
    return hash
}

export function describe(race: Race, phenotype: Phenotype): string {
    let res = ""
    for (const i in race.traits) {
        if (phenotype[race.traits[i].code])
            res = `${res} ${phenotype[race.traits[i].code]}`
    }
    return res.trimStart()
}

export function getPhenotypeStats(race: Race, phenotypes: Phenotype[]): PhenotypeIndex {
    let sum = 0
    const index: PhenotypeIndex = {}

    phenotypes.forEach(p => {
        const key = hashPhenotype(p);
        if (!(key in index)) {
            index[key] = {
                counter: 0,
                ratio: 0,
                sex: p['sex'],
                phenotype: p
            }
        }
        sum++
        index[key].counter++
    })
    for (const key in index) {
        index[key].ratio = index[key].counter / sum
    }
    return index
}

export function getPossibleGenes(race: Race, sex: Sex, phenotype: Phenotype): PossibleGenes {
    const result: { [code: GeneCode]: AllelePair[] } = {}
    race.genes.forEach(gene => result[gene.code] = getAlleleCombinations(gene, sex));
    race.traits.forEach(trait => {
        if (!trait.sexes.includes(sex)) {
            return
        }
        const traitValue: TraitValue = phenotype[trait.code] ?? ''
        if (!phenotype[trait.code]) {
            for (const traitValue in trait.values) {
                for (const geneCode in trait.values[traitValue]) {
                    result[geneCode] = result[geneCode].filter(pair1 =>
                        trait.values[traitValue][geneCode].some(pair2 => allelePairEquals(pair1, pair2))
                    )
                }
            }
            return
        }
        for (const geneCode in trait.values[traitValue]) {
            result[geneCode] = result[geneCode].filter(pair1 =>
                !trait.values[traitValue][geneCode].some(pair2 => allelePairEquals(pair1, pair2))
            )
        }
    });
    return result;
}
