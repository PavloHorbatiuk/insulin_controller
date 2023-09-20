'use client'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { Button } from '@components/ui-components/Button/Button';
import dayjs from 'dayjs';
import { useMediaQuery } from '@mui/material';
import { MobileDateTimePicker, DateTimePicker, DateTimeValidationError } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


interface IProps {
	type: string;
	submitting: boolean,
	formValues: (values: Record<string, any>) => Promise<void>
}

const MyForm: React.FC<IProps> = ({ type, submitting, formValues }) => {
	const dateNow = dayjs();
	const initialValues = {
		dosage: '17',
		dateTime: dateNow,
	};

	const validationSchema = Yup.object({
		dosage: Yup.number()
			.typeError('Dosage must be a number')
			.required('Dosage is required'),
		dateTime: Yup.date().required('Date and Time are required'),
	});

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			formValues(values);
		},
	});

	const isMobile = useMediaQuery('(max-width: 600px)');

	return (
		<section className="w-full max-w-full flex-start flex-col" >
			<form onSubmit={formik.handleSubmit} className="mt-10 max-w-xs flex flex-col gap-7 glassmorphism">
				<div>
					<TextField
						fullWidth
						label="Dosage of Long Insulin"
						id="dosage"
						name="dosage"
						type="number"
						value={formik.values.dosage}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.dosage && Boolean(formik.errors.dosage)}
						helperText={formik.touched.dosage && formik.errors.dosage}
						className='form_input'
					/>
				</div>
				<div>

					<LocalizationProvider dateAdapter={AdapterDayjs}>
						{isMobile ? (
							<MobileDateTimePicker
								label="Date and Time"
								value={formik.values.dateTime}
								onChange={(value) => formik.setFieldValue('dateTime', value)}
								slotProps={{
									textField: {
										variant: "outlined",
										error: formik.touched.dateTime && Boolean(formik.errors.dateTime)
									}
								}}
							/>
						) : (
							<DateTimePicker
								disableFuture
								label="Date"
								value={formik.values.dateTime}
								onChange={(value) => formik.setFieldValue("dateTime", value, true)}
								slotProps={{
									textField: {
										variant: "outlined",
										error: formik.touched.dateTime && Boolean(formik.errors.dateTime),

									}
								}}
							/>)}
					</LocalizationProvider>
				</div>
				<div className='flex-end mx-3 mb-5 gap-4'>
					<Link href={'/'} className='text-grey-500 text-sm'>Cancel</Link>
					<Button
						variant='primary'
						type='submit'
						disabled={submitting}
						className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
					>{submitting ? `${type}...` : type}</Button>
				</div>
			</form>
		</section>
	);
};

export default MyForm;
