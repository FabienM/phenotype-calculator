import { Race } from "../types/interfaces";
import { traitColour } from "./colour.trait";
import { geneColour, geneDilution, geneRed } from "./genes";
import { traitTortie } from "./tortie.trait";

export const raceSimpleBirman: Race = {
    genes: [
        geneColour,
        geneDilution,
        geneRed
    ],
    traits: [
        traitColour,
        traitTortie
    ]
};