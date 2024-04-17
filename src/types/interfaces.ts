import { Allele, GeneCode, Genotype, Sex, TraitPossibleGenePairs, TraitValue } from "./types"

export interface Race {
    genes: Gene[]
    traits: Trait[]
}

export interface Gene {
    code: GeneCode
    alleles: { [code: Allele]: boolean }
    sexual: boolean
}

export interface Trait {
    sexes: Sex[]
    code: string
    valueFor: (genotype: Genotype) => TraitValue | null
    values: { [value: TraitValue]: TraitPossibleGenePairs }
}

export interface Organism {
    sex: Sex
    race: Race
    genotype: Genotype
}