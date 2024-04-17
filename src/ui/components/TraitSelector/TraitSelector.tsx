import { Checkbox, Option, Select, Sheet } from "@mui/joy";
import { Trait } from "../../../types/interfaces";
import { Sex, TraitValue } from "../../../types/types";

interface TraitDescriptionProp {
    trait: Trait
    sex: Sex
    onChange?: (v: TraitValue | null) => void
    value?: TraitValue
}

function TraitSelector(props: TraitDescriptionProp) {
    if (Object.keys(props.trait.values).length > 1) {
        return (
            <Select
                placeholder={props.trait.code}
                name={`${props.sex}-${props.trait.code}`}
                variant="soft"
                value={props.value}
                onChange={(event, value: string | null) => { props.onChange?.(value ?? '') }}
            >
                {Object.keys(props.trait.values).map(key =>
                    <Option value={key} key={key}>{key}</Option>
                )}
            </Select>
        )
    }
    return (
        <Sheet variant="outlined" sx={{ borderRadius: 'md', p: 1 }}>
            <Checkbox
                overlay
                variant="plain"
                label={Object.keys(props.trait.values)[0]}
                onChange={(event) => { props.onChange?.(event.target.checked ? Object.keys(props.trait.values)[0] : null) }}
            />
        </Sheet>
    )
}

export default TraitSelector;