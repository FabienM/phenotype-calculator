import { Grid, Stack, Typography } from '@mui/joy';
import { useState } from 'react';
import { Organism, Race } from '../../types/interfaces';
import { Sex } from '../../types/types';
import CatDescriptor from '../components/CatDescriptor/CatDescriptor';
import OffSpringDisplay from '../components/OffspringDisplay/OffspringDisplay';
import { FormattedMessage } from 'react-intl';

interface BirmanPageProp {
    race: Race
    raceName: string
}

function BirmanPage(props: BirmanPageProp) {
    const [femaleState, setFemaleState] = useState<Organism>();
    const [maleState, setMaleState] = useState<Organism>();
    const sexes: Sex[] = ['male', 'female']

    return (
        <Stack bgcolor='background.body' sx={{ m: 5 }} spacing={2}>
            <Typography level='h1'>
                <FormattedMessage defaultMessage="Calculate offsprings for " id="RrEdup" />
                <Typography textColor='primary.500'>{props.raceName}</Typography></Typography>
            <Typography level='h2'>Parents</Typography>
            <Grid container spacing={2}>
                {sexes.map(sex => {
                    return (
                        <Grid key={sex} sm={6}>
                            <CatDescriptor sex={sex} race={props.race} onChange={g => {
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
