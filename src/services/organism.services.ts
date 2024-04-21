import { Organism } from "../types/interfaces";
import { Phenotype } from "../types/types";

export function encodeGenotype(organism: Organism): string {
    let encoded = "";
    organism.race.genes.forEach(gene =>
        encoded = `${encoded} ${organism.genotype[gene.code][0]}${organism.genotype[gene.code][1]}`)
    return encoded.trimStart();
}

export function getPhenotype(organism: Organism): Phenotype {
    let phenotype: Phenotype = { 'sex': organism.sex };
    for (let trait in organism.race.traits) {
        phenotype[organism.race.traits[trait].code] = organism.race.traits[trait].valueFor(organism.genotype);
    }
    return phenotype
}

export function isValid(o: Organism | undefined): boolean {
    if (!o) {
        return false;
    }
    let result = true;
    o.race.genes.forEach(gene => {
        if (!o.genotype[gene.code]) {
            result = false;
        }
    });
    return result;
}