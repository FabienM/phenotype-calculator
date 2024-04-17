import { Gene } from "../types/interfaces";
import { AllelePair, Sex } from "../types/types";

export function getAlleleCombinations(gene: Gene, sex: Sex): AllelePair[] {
    const alleleCodes = Object.keys(gene.alleles);
    return alleleCodes.flatMap((allele, idx) => {
        if (gene.sexual && sex === 'male') {
            const res: AllelePair = [allele, '-'];
            return [res];
        }
        return alleleCodes.slice(idx).map(allele2 => {
            const res: AllelePair = [allele, allele2];
            return res;
        })
    })
}

export function allelePairEquals(a1: AllelePair, a2: AllelePair) {
    return (a1[0] === a2[0] && a1[1] === a2[1]) || (a1[0] === a2[1] && a1[1] === a2[0])
}
