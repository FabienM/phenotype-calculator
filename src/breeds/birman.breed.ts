import { Race } from "../types/interfaces";
import { geneColour, geneDilution, geneRed, geneSilver, geneTabby } from "../genes/genes";
import traitColour from "../traits/colour.trait";
import traitTortie from "../traits/tortie.trait";
import traitSilver from "../traits/silver.trait";
import traitTabby from "../traits/tabby.trait";

export const birman: Race = {
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
