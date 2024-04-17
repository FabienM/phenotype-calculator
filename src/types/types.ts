import { Gene } from "./interfaces"

export type Allele = string | '-'
export type AllelePair = [Allele, Allele]
export type GeneCode = string

export type Genotype = { [code: GeneCode]: AllelePair }
export type GeneTree = {
    gene: Gene
    pair: AllelePair
    children: GeneTree[]
}
export type PossibleGenes = { [code: GeneCode]: AllelePair[] }

export type TraitValue = string
export type TraitCode = string
export type TraitPossibleGenePairs = { [code: GeneCode]: AllelePair[] }

export type Phenotype = { [code: TraitCode]: TraitValue | null }
export type PhenotypeIndex = {
    [x: string]: {
        description: string
        sex: TraitValue | null
        counter: number
        ratio: string
    }
}

export type Sex = 'male' | 'female'