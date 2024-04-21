import { Gene, Organism, Race } from "../types/interfaces";
import { GeneTree, Sex } from "../types/types";

export function generateOffsprings(male: Organism, female: Organism): Organism[] {
    return organismsFromTree(buildGeneTree(male.race.genes, "male", male, female), male.race, "male")
        .concat(organismsFromTree(buildGeneTree(male.race.genes, "female", male, female), female.race, "female"));
}

function organismsFromTree(tree: GeneTree[], race: Race, sex: Sex): Organism[] {
    if (tree.length === 0) {
        return [{ genotype: {}, race: race, sex: sex }]
    }
    return tree.flatMap(subtree => {
        return organismsFromTree(subtree.children, race, sex).map(organism => {
            organism.genotype[subtree.gene.code] = subtree.pair
            return organism
        })
    })
}

function buildGeneTree(genes: Gene[], sex: Sex, male: Organism, female: Organism): GeneTree[] {
    if (genes.length === 0) {
        return [];
    }
    const currentGene = genes[0]
    let trees: GeneTree[] = []
    let subtree = buildGeneTree(genes.slice(1), sex, male, female)
    male.genotype[currentGene.code].forEach(maleValue => female.genotype[currentGene.code].forEach(femaleValue => {
        let maleValueIfSexual = maleValue
        if (maleValue === '-') {
            return
        }
        if (currentGene.sexual && sex === "male") {
            maleValueIfSexual = '-'
        }
        trees.push(
            {
                gene: currentGene,
                children: subtree,
                pair: [femaleValue, maleValueIfSexual]
            }
        )
    }))
    return trees
}