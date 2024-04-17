import { Race } from "../types/interfaces";
import { geneColour, geneDilution, geneRed, geneSilver, geneTabby } from "./genes";
import { traitColour } from "./colour.trait";
import { traitSilver } from "./silver.trait";
import { traitTabby } from "./tabby.trait";
import { traitTortie } from "./tortie.trait";

export const raceBirman: Race = {
    genes: [
        geneColour,
        geneDilution,
        geneRed,
        geneSilver,
        geneTabby,
    ],
    traits: [
        traitColour,
        traitTortie,
        traitSilver,
        traitTabby,
    ]
};