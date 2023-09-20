import User from '@models/user';
import { Profile } from 'next-auth';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from 'utils/database';

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
		}),
	],
	callbacks: {
		async session({ session }) {
			if (session.user) {
				const sessionUser = await User.findOne({
					email: session.user.email,
				});
				if (sessionUser) {
					session.user.id = sessionUser._id.toString();
				}
			}
			return session;
		},

		async signIn({ profile }) {
			try {
				await connectToDB();
				const { name, email, picture } = profile as Profile;
				const userExists = await User.findOne({
					email: profile?.email,
				});

				if (!userExists) {
					await User.create({
						email: email,
						username: name?.replaceAll(/\s/g, '').toLowerCase(),
						image: picture,
					});
				}

				return true;
			} catch (error) {
				console.error(error);
				return false;
			}
		},
	},
});

export { handler as GET, handler as POST };
