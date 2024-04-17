import { Trait } from "../types/interfaces";
import { Genotype, TraitValue } from "../types/types";
import { geneColour, geneDilution, geneRed } from "./genes";
import { traitTortie } from "./tortie.trait";

export const traitColour: Trait = {
    sexes: ['male', 'female'],
    code: 'colour', valueFor: function (genotype: Genotype): TraitValue | null {
        const isDiluted = genotype[geneDilution.code].indexOf('D') < 0;
        const isTortie = traitTortie.valueFor(genotype);

        if (!isTortie && genotype[geneRed.code].indexOf('O') > -1 && !isDiluted) {
            return 'red';
        }
        if (!isTortie && genotype[geneRed.code].indexOf('O') > -1) {
            return 'cream';
        }
        if (genotype[geneColour.code].indexOf('B') > -1 && !isDiluted) {
            return 'seal';
        }
        if (genotype[geneColour.code].indexOf('B') > -1) {
            return 'blue';
        }
        if (genotype[geneColour.code].indexOf('b') > -1 && !isDiluted) {
            return 'chocolate';
        }
        if (genotype[geneColour.code].indexOf('b') > -1) {
            return 'lilac';
        }
        if (genotype[geneColour.code].indexOf('bl') > -1 && !isDiluted) {
            return 'cinnamon';
        }
        if (genotype[geneColour.code].indexOf('bl') > -1) {
            return 'fawn';
        }

        return null;
    },
    values: {
        'red': {
            // 'red': [['O', 'O'], ['O', 'o'], ['O', '-']],
            // 'colour': [['B', 'B'], ['B', 'b'], ['B', 'bl'], ['b', 'b'], ['b', 'bl'], ['bl', 'bl']],
            // 'dilution': [['D', 'D'], ['D', 'd']],
            'red': [['o', 'o'], ['o', '-']],
            'dilution': [['d', 'd']],
        },
        'cream': {
            // 'red': [['O', 'O'], ['O', 'o'], ['O', '-']],
            // 'colour': [['B', 'B'], ['B', 'b'], ['B', 'bl'], ['b', 'b'], ['b', 'bl'], ['bl', 'bl']],
            // 'dilution': [['d', 'd']],
            'red': [['o', 'o'], ['o', '-']],
            'dilution': [['D', 'D'], ['D', 'd']],
        },
        'seal': {
            // 'colour': [['B', 'B'], ['B', 'b'], ['B', 'bl']],
            // 'dilution': [['D', 'D'], ['D', 'd']],
            'colour': [['b', 'b'], ['b', 'bl'], ['bl', 'bl']],
            'dilution': [['d', 'd']],
        },
        'blue': {
            // 'colour': [['B', 'B'], ['B', 'b'], ['B', 'bl']],
            // 'dilution': [['d', 'd']],
            'colour': [['b', 'b'], ['b', 'bl'], ['bl', 'bl']],
            'dilution': [['D', 'D'], ['D', 'd']],
        },
        'chocolate': {
            // 'colour': [['b', 'b'], ['b', 'bl']],
            // 'dilution': [['D', 'D'], ['D', 'd']],
            'colour': [['B', 'B'], ['B', 'b'], ['B', 'bl'], ['bl', 'bl']],
            'dilution': [['d', 'd']],
        },
        'lilac': {
            // 'colour': [['b', 'b'], ['b', 'bl']],
            // 'dilution': [['d', 'd']],
            'colour': [['B', 'B'], ['B', 'b'], ['B', 'bl'], ['bl', 'bl']],
            'dilution': [['D', 'D'], ['D', 'd']],
        },
        'cinnamon': {
            // 'colour': [['bl', 'bl']],
            // 'dilution': [['D', 'D'], ['D', 'd']],
            'colour': [['B', 'B'], ['B', 'b'], ['B', 'bl'], ['b', 'b'], ['b', 'bl']],
            'dilution': [['d', 'd']],
        },
        'fawn': {
            'colour': [['B', 'B'], ['B', 'b'], ['B', 'bl'], ['b', 'b'], ['b', 'bl']],
            'dilution': [['D', 'D'], ['D', 'd']],
        },
    }
}