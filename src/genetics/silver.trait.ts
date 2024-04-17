import { Trait } from "../types/interfaces"
import { Genotype, TraitValue } from "../types/types"
import { geneSilver } from "./genes"

export const traitSilver: Trait = {
    sexes: ['male','female'],
    code: 'silver', valueFor: function (genotype: Genotype): TraitValue | null {
        if (genotype[geneSilver.code].indexOf('I') > -1) {
            return 'silver'
        }
        return null
    },
    values: {
        'silver': {
            // 'silver': [['I', 'I'], ['I', 'i']]
            'silver': [['i', 'i']]
        }
    }
}