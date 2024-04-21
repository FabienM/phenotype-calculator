import { Trait } from "../types/interfaces"
import { Genotype, TraitValue } from "../types/types"
import { geneTabby } from "../genes/genes"

const traitTabby: Trait = {
    sexes: ['male', 'female'],
    code: 'tabby', valueFor: function (genotype: Genotype): TraitValue | null {
        if (genotype[geneTabby.code].indexOf('A') > -1) {
            return 'tabby'
        }
        return null
    },
    values: {
        'tabby': {
            'tabby': [['a', 'a']]
        }
    }
}

export default traitTabby;