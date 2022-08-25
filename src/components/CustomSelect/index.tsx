import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { nanoid } from 'nanoid';
import { Field } from '../../@types/formFiles';

interface ICustomSelectProps extends Field {
    onChange: (event: SelectChangeEvent<string>) => void
    value: string | number;
}

const CustomSelect = ({ id, name, value, onChange, options }: ICustomSelectProps) => {
    return (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id={`select-${id}`}>{name}</InputLabel>
            <Select
                labelId={`select-${id}`}
                id={id.toString()}
                value={value.toString()}
                name={id.toString()}
                label={name}
                onChange={onChange}
            >
                {options?.map(item => <MenuItem key={nanoid()} value={item.value}>{item.name}</MenuItem>)}
            </Select>
        </FormControl>
    );
}

export default CustomSelect;