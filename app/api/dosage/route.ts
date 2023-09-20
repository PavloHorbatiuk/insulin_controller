import Dosage from '@models/injection';
import { connectToDB } from 'utils/database';

export const GET = async request => {
	try {
		await connectToDB();

		const dosage = await Dosage.find({}).populate('creator');

		return new Response(JSON.stringify(dosage), { status: 200 });
	} catch (error) {
		return new Response('Failed to fetch all injections', { status: 500 });
	}
};
