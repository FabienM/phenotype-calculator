import { Grid, Stack, Typography } from '@mui/joy';
import { useState } from 'react';
import { Organism, Race } from '../../types/interfaces';
import { Sex } from '../../types/types';
import CatDescriptor from '../components/CatDescriptor/CatDescriptor';
import OffSpringDisplay from '../components/OffspringDisplay/OffspringDisplay';

interface BirmanPageProp {
    race: Race
}

function BirmanPage(props: BirmanPageProp) {
    let [femaleState, setFemaleState] = useState<Organism>();
    let [maleState, setMaleState] = useState<Organism>();
    const sexes: Sex[] = ['male', 'female']

    return (
        <Stack>
            <Typography level='h2'>Parents</Typography>
            <Grid container spacing={3}>
                {sexes.map(sex => {
                    return (
                        <Grid key={sex} sm={6}>
                            <CatDescriptor sex={sex} race={props.race} name={sex} onChange={g => {
                                const organism = { genotype: g, race: props.race, sex: sex };
                                if (sex === "female") {
                                    setFemaleState(organism);
                                    return;
                                }
                                setMaleState(organism);
                            }} />
                        </Grid>
                    )
                })}
                <Grid sm={12}>
                    <Typography level='h2'>Offsprings</Typography>
                </Grid>
                <Grid sm={12}>
                    <OffSpringDisplay race={props.race} female={femaleState} male={maleState} />
                </Grid>
            </Grid>
        </Stack >
    );
}

export default BirmanPage;
