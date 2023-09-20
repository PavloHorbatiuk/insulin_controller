"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Form from '@components/Form.tsx/Form';
import { useState, useEffect, useCallback } from 'react';
import useStore from 'store/store';
import dayjs from 'dayjs';

const AddDosage = () => {
	const router = useRouter();
	const { data: session } = useSession();
	const [submitting, setSubmitting] = useState(false);
	const { posts } = useStore();
	const checkInjectionsTodayDid = useCallback(() => {
		return posts.some((injection) => {
			return dayjs(injection.createdAt).format("MM/DD/YYYY") === dayjs().format('MM/DD/YYYY');
		});
	}, [posts]);
	useEffect(() => {
		if (session?.user.id) {
			if (!checkInjectionsTodayDid()) {
				setSubmitting(false);
			} else {
				//router.push('/');
			}
		}
	}, [session?.user.id, posts, router, checkInjectionsTodayDid]);

	const postDosage = async (values) => {
		setSubmitting(true);

		try {
			const response = await axios.post('/api/dosage/new', {
				...values,
				userId: session?.user.id,
			});

			if (response.status === 201) {
				router.push('/');
			}
		} catch (error) {
			console.error(error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div>
			{session?.user.id ? (
				!submitting ? (
					!checkInjectionsTodayDid ? (
						<Form type={'Add long insulin'} submitting={submitting} formValues={postDosage} />
					) : (
						<p className="text-rose-700 font-semibold">Today has already been an injection of long insulin</p>
					)
				) : (
					<p>Submitting...</p>
				)
			) : (
				<p>Please use Sign in</p>
			)}
		</div>
	);
};

export default AddDosage;
