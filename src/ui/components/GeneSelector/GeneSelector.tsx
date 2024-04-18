import { List, ListItem, Radio, RadioGroup, Stack, Typography } from "@mui/joy";
import { allelePairEquals, getAlleleCombinations } from "../../../services/genotype.services";
import { Gene } from "../../../types/interfaces";
import { AllelePair, Sex } from "../../../types/types";

interface GeneSelectorProp {
    gene: Gene
    sex: Sex
    enabledPairs: AllelePair[]
    onChange?: (a: AllelePair) => void
}

function GeneSelector(props: GeneSelectorProp) {
    return (
        <Stack>
            <Typography>{props.gene.code}</Typography>
            <RadioGroup name={`${props.sex}-${props.gene.code}-group`} orientation="vertical" onChange={e => {
                const [a1, a2] = e.target.value.split(',')
                props.onChange?.([a1, a2])
            }}>
                <List>
                    {getAlleleCombinations(props.gene, props.sex).map(allele => {
                        const enabled = props.enabledPairs?.some(pair => allelePairEquals(allele, pair));
                        return (
                            <ListItem variant={enabled ? 'outlined' : 'soft'} key={`${allele[0]}${allele[1]}`}>
                                <Radio
                                    label={`${allele[0]}${allele[1]}`}
                                    overlay
                                    disabled={!enabled}
                                    disableIcon
                                    value={`${allele[0]},${allele[1]}`}
                                    slotProps={{
                                        label: ({ checked }) => ({
                                            sx: {
                                                fontWeight: 'lg',
                                                fontSize: 'md',
                                                color: checked ? 'text.primary' : 'text.secondary',
                                            },
                                        }),
                                        action: ({ checked }) => ({
                                            sx: (theme) => ({
                                                ...(checked && {
                                                    '--variant-borderWidth': '2px',
                                                    '&&': {
                                                        // && to increase the specificity to win the base :hover styles
                                                        borderColor: theme.vars.palette.primary[500],
                                                    },
                                                }),
                                            }),
                                        }),
                                    }}
                                />
                            </ListItem>
                        )
                    }
                    )}
                </List>
            </RadioGroup>
        </Stack>
    )
}

export default GeneSelector;