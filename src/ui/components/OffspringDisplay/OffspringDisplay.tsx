import { Typography } from "@mui/joy";
import { DataGrid, GridColDef, GridColumnVisibilityModel, GridRowsProp, GridToolbar } from "@mui/x-data-grid";
import { generateOffsprings } from "../../../services/offsprings.services";
import { getPhenotype, isValid } from "../../../services/organism.services";
import { describe, getPhenotypeStats } from "../../../services/phenotype.services";
import { Organism, Race } from "../../../types/interfaces";

interface OffspringDisplayProp {
    race: Race
    female?: Organism
    male?: Organism
}

function initColumnVisibilityModel(race: Race): GridColumnVisibilityModel {
    return Object.assign({},
        ...race.traits.map(trait => ({ [trait.code]: false })));
}

function OffSpringDisplay(props: OffspringDisplayProp) {
    const isMaleValid = isValid(props.male);
    const isFemaleValid = isValid(props.female);

    if (!props.male || !props.female || (!isFemaleValid || !isMaleValid)) {
        return (
            <Typography>Please chose the Parents</Typography>
        );
    }
    if (!isValid(props.male)) {
        return (
            <Typography>The Male is not valid</Typography>
        );
    }
    if (!props.female || !isValid(props.female)) {
        return (
            <Typography>The Female is not valid</Typography>
        );
    }
    const offsprings = generateOffsprings(props.male, props.female)
    const stats = getPhenotypeStats(
        props.race,
        offsprings
            .map(offspring => getPhenotype(offspring)));
    const columns: GridColDef[] = [
        { field: 'sex', headerName: 'Sex', minWidth: 100 },
        { field: 'description', headerName: 'Description', minWidth: 200 },
        { field: 'ratio', headerName: 'Ratio', minWidth: 100, type: "number" },
    ];
    props.race.traits.forEach(trait => {
        columns.push({
            field: trait.code, headerName: trait.code, width: 150
        });
    });
    const rows: GridRowsProp = Object.keys(stats).map(code => {
        const result: { [key: string]: string | number | null } = {
            id: code,
            sex: stats[code].sex,
            description: describe(props.race, stats[code].phenotype),
            ratio: Number(stats[code].ratio).toLocaleString(undefined, {style: 'percent', minimumFractionDigits:2, maximumFractionDigits:2}),
        };
        props.race.traits.forEach(trait =>
            result[trait.code] = stats[code].phenotype[trait.code]
        )
        return result;
    });
    return (
        <DataGrid
            initialState={{
                columns: initColumnVisibilityModel(props.race)
            }}
            columnVisibilityModel={initColumnVisibilityModel(props.race)}
            slots={{
                toolbar: GridToolbar,
            }}
            rows={rows}
            columns={columns} />
    );
}

export default OffSpringDisplay;