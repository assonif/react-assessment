import { TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Field } from '../../@types/formFiles';

interface ICustomDatePickerProps extends Field {
    onChange: (value: Date, name: string) => void
    value: string | number;
}

const CustomDatePicker = ({ id, name, value, onChange }: ICustomDatePickerProps) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
                inputFormat="MM/dd/yyyy"
                value={value}
                onChange={(value: Date | null) => onChange(value as Date, id.toString())}
                label={name}
                renderInput={(params) => <TextField name={id.toString()} {...params} />}
            />
        </LocalizationProvider>
    );
}

export default CustomDatePicker;