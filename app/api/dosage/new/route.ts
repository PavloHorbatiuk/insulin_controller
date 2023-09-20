import { connectToDB } from 'utils/database';

import Dosage from '@models/injection';

export const POST = async req => {
	const { userId, dosage, dateTime } = await req.json();

	try {
		await connectToDB();
		const newDosage = new Dosage({
			creator: userId,
			injection: dosage,
			createdAt: dateTime,
		});

		await newDosage.save();

		return new Response(JSON.stringify(newDosage), { status: 201 });
	} catch (error) {
		return new Response('Failed to create a new injection', { status: 500 });
	}
};
