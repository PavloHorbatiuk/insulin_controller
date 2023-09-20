import React from 'react';
import { useMediaQuery } from '@mui/material';
import { MobileDateTimePicker, DateTimePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';


interface DateTimePickerProps {
	name: string;
	label: string;
	value: Dayjs;
	onChange: (value: string) => void;
	onError: (field: string, value: string | undefined) => void;
	onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const DateTimePickerWrapper: React.FC<DateTimePickerProps> = ({
	name,
	label,
	value,
	onChange,
	onError,
	onBlur,
}) => {
	const isMobile = useMediaQuery('(max-width: 600px)');

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			{isMobile ? (
				<MobileDateTimePicker
					label={label}
					name={name}
					value={value}
					onChange={(value) => onChange(value)}
					onError={onError}
					onBlur={onBlur}
					renderInput={(params) => <TextField {...params} fullWidth />}
					className="form_input"
				/>
			) : (
				<DateTimePicker
					label={label}
					name={name}
					value={value}
					onChange={(value) => onChange(value || '')}
					onError={onError}
					onBlur={onBlur}
					renderInput={(params) => <TextField {...params} fullWidth />}
					className="form_input"
				/>
			)}
		</LocalizationProvider>
	);
};

export default DateTimePickerWrapper;