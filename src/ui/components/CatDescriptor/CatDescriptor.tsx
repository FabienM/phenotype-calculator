import { Box, Grid, Stack, Typography } from "@mui/joy";
import { useState } from "react";
import { getPossibleGenes } from "../../../services/phenotype.services";
import { Race } from "../../../types/interfaces";
import { Genotype, Phenotype, PossibleGenes, Sex } from "../../../types/types";
import GeneChip from "../GeneChip/GeneChip";
import GeneSelector from "../GeneSelector/GeneSelector";
import TraitSelector from "../TraitSelector/TraitSelector";

interface CatDescriptorProp {
    name: string
    race: Race
    sex: Sex
    onChange?: (g: Genotype) => void
}

function CatDescriptor(prop: CatDescriptorProp) {
    let [phenotypeState, setPhenotypeState] = useState<Phenotype>({});
    let [geneStates, setGeneStates] = useState<PossibleGenes>(getPossibleGenes(prop.race, prop.sex, phenotypeState));
    let [genotypeState, setGenotypeState] = useState<Genotype>({});

    return (
        <Box>
            <Typography level="h3">{prop.name}</Typography>
            {prop.race.genes.map(gene =>
                <GeneChip key={gene.code} alleles={genotypeState[gene.code] ?? ''} />
            )}
            <Grid container spacing={3}>
                <Grid sm={4}>
                    <Stack>
                        <Typography level="h4">Traits</Typography>
                        {prop.race.traits.filter(t => t.sexes.includes(prop.sex)).map(trait => (
                            <TraitSelector
                                sex={prop.sex}
                                trait={trait}
                                key={trait.code}
                                value={phenotypeState[trait.code] ?? undefined}
                                onChange={v => {
                                    phenotypeState[trait.code] = v;
                                    setPhenotypeState(phenotypeState);
                                    setGeneStates(getPossibleGenes(prop.race, prop.sex, phenotypeState));
                                }} />
                        ))}
                    </Stack>
                </Grid>
                <Grid sm={8}>
                    <Stack>
                        <Typography level="h4">Genes</Typography>
                        <Grid container spacing={1}>
                            {prop.race.genes.map(gene => (
                                <Grid sm={2} key={gene.code}>
                                    <GeneSelector gene={gene} sex={prop.sex} enabledPairs={geneStates[gene.code]}
                                        onChange={a => {
                                            genotypeState[gene.code] = a;
                                            setGenotypeState(genotypeState);
                                            prop.onChange?.(genotypeState);
                                        }} />
                                </Grid>
                            ))}
                        </Grid>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CatDescriptor;