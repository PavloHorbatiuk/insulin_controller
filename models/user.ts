import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
	{
		email: {
			type: String,
			unique: [true, 'Email already exist!'],
			required: [true, 'Email is required'],
		},
		username: {
			type: String,
			required: [true, 'Username is required!'],
			match: [
				/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._ñÑа-яА-ЯёЁіІїЇ]+(?<![_.])$/,
				'Username invalid, it should contain 8-20 alphanumeric letters (including Ukrainian and English), periods, underscores, and not start or end with a period or underscore, and be unique!',
			],
		},
		image: {
			type: String,
		},
	},
	{ timestamps: true }
);
const User = models.User || model('User', UserSchema);
export default User;
