import { Typography } from "@mui/joy";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { generateOffsprings } from "../../../services/offsprings.services";
import { getPhenotype, isValid } from "../../../services/organism.services";
import { getPhenotypeStats } from "../../../services/phenotype.services";
import { Organism } from "../../../types/interfaces";

interface OffspringDisplayProp {
    female?: Organism
    male?: Organism
}

function OffSpringDisplay(props: OffspringDisplayProp) {
    const isMaleValid = isValid(props.male);
    const isFemaleValid = isValid(props.female);
    if (!props.male || !props.female || (!isFemaleValid || !isMaleValid)) {
        return (
            <Typography>Please chose the Parents</Typography>
        );
    }
    if(!isValid(props.male)) {
        return (
            <Typography>The Male is not valid</Typography>
        );
    }
    if(!isValid(props.female)) {
        return (
            <Typography>The Female is not valid</Typography>
        );
    }
    const offsprings = generateOffsprings(props.male, props.female)
    const stats = getPhenotypeStats(
        props.female.race,
        offsprings
            .map(offspring => getPhenotype(offspring)))
    const rows: GridRowsProp = Object.keys(stats).map(code => {
        return {
            id: code
        }
    })
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 150 },
      ];
    return (
        <DataGrid rows={rows} columns={columns} />
        // <Typography>Test</Typography>
    );
}

export default OffSpringDisplay;