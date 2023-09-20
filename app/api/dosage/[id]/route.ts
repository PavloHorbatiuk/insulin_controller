import { connectToDB } from 'utils/database';
import Dosage from '@models/injection';

export const GET = async (request, { params }) => {
	try {
		await connectToDB();

		const prompt = await Dosage.findById(params.id).populate('creator');
		if (!prompt) return new Response('Prompt not found', { status: 404 });

		return new Response(JSON.stringify(prompt), { status: 200 });
	} catch (error) {
		return new Response('Failed to fetch all prompts', { status: 500 });
	}
};

export const PATCH = async (request, { params }) => {
	const {  injection, dateTime } = await request.json();

	try {
		await connectToDB();

		const existingDosage = await Dosage.findById(params.id);
		if (!existingDosage)
			return new Response('Injection not found', { status: 404 });
		existingDosage.dosage = injection;
		existingDosage.tab = dateTime;

		await existingDosage.save();
		return new Response(JSON.stringify(existingDosage), { status: 200 });
	} catch (error) {
		return new Response('Failed to fetch all prompts', { status: 500 });
	}
};
export const DELETE = async (request, { params }) => {
	try {
		await connectToDB();

		await Dosage.findByIdAndRemove(params.id);
		return new Response('Prompt deleted successfully', { status: 200 });
	} catch (error) {
		return new Response('Failed to fetch all prompts', { status: 500 });
	}
};
