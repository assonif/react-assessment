import { Button, Paper, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import { ChangeEvent, useCallback, useState } from 'react';
import { ConfigFile, DataFile, Field } from '../../@types/formFiles';
import { server } from '../../config';
import CustomDatePicker from '../CustomDatePicker';
import CustomInput from '../CustomInput';
import CustomSelect from '../CustomSelect';

interface IFormProps {
    formConfig: ConfigFile;
    formDataFile: DataFile;
}

const FormContainer = ({ formConfig, formDataFile }: IFormProps) => {
    const [formInfo, setFormInfo] = useState<any>(() => {
        const formInitialValue = formConfig.fields.reduce((prev, curr) => {
            const data = formDataFile.data.find((data) => data.fieldId === curr.id)

            return {
                [curr.id]: data?.value,
                ...prev
            }
        }, {})

        return formInitialValue;
    })

    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
        const { name, value } = event.target;

        setFormInfo((current: any) => ({
            ...current,
            [name]: value,
        }))
    }, []);

    const handleDateChange = useCallback((value: Date, name: string) => {
        setFormInfo((current: any) => ({
            ...current,
            [name]: format(value, 'MM/dd/yyyy'),
        }))
    }, []);

    const handleSaveForm = useCallback(async () => {
        const arrayOfData = Object.keys(formInfo).map(id => (
            {
                fieldId: parseInt(id),
                value: formInfo[id]
            }
        ))
        await fetch(`${server}/api/data`, {
            method: 'PUT',
            body: JSON.stringify(arrayOfData)
        })
    }, [formInfo])

    const getFormField = useCallback(({ type, id, name, options }: Field) => {
        switch (type) {
            case 'text':
            case 'number':
                return <CustomInput key={id} type={type} id={id} name={name} value={formInfo[id]} onChange={handleInputChange} />
            case 'date':
                return <CustomDatePicker key={id} id={id} name={name} type={type} value={formInfo[id]} onChange={handleDateChange} />
            case 'select':
                return <CustomSelect key={id} id={id} name={name} type={type} value={formInfo[id]} options={options} onChange={handleInputChange} />
        }
    }, [formInfo, handleDateChange, handleInputChange])

    return (
        <Paper variant='outlined'>
            <Stack spacing={2} padding="1rem">
                <Typography component="h1">
                    {formConfig.formName}
                </Typography>
                <>
                    {formConfig.fields.map((field) => getFormField(field))}
                </>
                <Button variant="outlined" onClick={handleSaveForm}>Save</Button>
            </Stack>
        </Paper>

    );
}

export default FormContainer;