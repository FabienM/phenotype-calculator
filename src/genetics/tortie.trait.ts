import { Trait } from "../types/interfaces";
import { Genotype, TraitValue } from "../types/types";
import { geneRed } from "./genes";

export const traitTortie: Trait = {
    sexes: ['female'],
    code: 'tortie', valueFor: function (genotype: Genotype): TraitValue | null {
        if (genotype[geneRed.code].indexOf('-') > -1) {
            return null;
        }
        if (genotype[geneRed.code].indexOf('O') > -1) {
            return 'tortie';
        }
        return null;
    },
    values: {
        'tortie': {
            // 'red': [['O', 'O'], ['O', 'o']]
            'red': [['o', 'o']]
        }
    }
}