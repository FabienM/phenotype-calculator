import { Chip } from "@mui/joy";
import { AllelePair } from "../../../types/types";

interface GeneChipProp {
    alleles?: AllelePair
    disabled?: boolean
}

function GeneChip(props: GeneChipProp) {
    if (!props.alleles) {
        return (<Chip variant="outlined">? ?</Chip>);
    }
    return (
        <Chip variant="solid">{`${props?.alleles?.[0]} ${props?.alleles?.[1]}`}</Chip>
    );
}

export default GeneChip;