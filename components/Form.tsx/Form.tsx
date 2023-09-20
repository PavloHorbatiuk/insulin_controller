'use client'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { Button } from '@components/ui-components/Button/Button';
import dayjs from 'dayjs';
import useMediaQuery from '@mui/material/useMediaQuery';
import DateTimePickerWrapper from '@components/ui-components/DateTimePicker';


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
					<DateTimePickerWrapper label="Date and Time"
						name="dateTime"
						value={formik.values.dateTime}
						onChange={(value) => formik.setFieldValue('dateTime', value)}
						onError={formik.setFieldError}
						onBlur={formik.setFieldTouched}
						renderInput={(params) => <TextField {...params} fullWidth />}
						className="form_input" />

					{formik.touched.dateTime && Boolean(formik.errors.dateTime) && (
						<div>{formik.errors.dateTime}</div>
					)}
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
