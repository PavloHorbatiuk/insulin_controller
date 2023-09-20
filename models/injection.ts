import { Schema, model, models } from 'mongoose';

const InjectionSchema = new Schema({
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	injection: {
		type: Number,
		required: [true, 'Injection is required.'],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Dosage = models.Injection || model('Injection', InjectionSchema);

export default Dosage;
