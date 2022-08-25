import { TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { Field } from '../../@types/formFiles';

interface ICustomInputProps extends Field {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    value: string | number;
}

const CustomInput = ({ id, name, type, value, onChange }: ICustomInputProps) => {
    return (
        <TextField
            variant="outlined"
            label={name}
            name={id.toString()}
            placeholder={name}
            inputProps={{ type }}
            onChange={onChange}
            value={value}
        />
    );
}

export default CustomInput;