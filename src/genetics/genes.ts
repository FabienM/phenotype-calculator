import { Gene } from "../types/interfaces";

export const geneColour: Gene = { code: 'colour', alleles: { 'B': true, 'b': false, 'bl': false }, sexual: false };
export const geneDilution: Gene = { code: 'dilution', alleles: { 'D': true, 'd': false }, sexual: false };
export const geneRed: Gene = { code: 'red', alleles: { 'O': true, 'o': false }, sexual: true };
export const geneTabby: Gene = { code: 'tabby', alleles: { 'A': true, 'a': false }, sexual: false };
export const geneSilver: Gene = { code: 'silver', alleles: { 'I': true, 'i': false }, sexual: false };