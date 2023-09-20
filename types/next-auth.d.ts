import NextAuth from 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			/** The user's name. */
			id: string | null;
			sub?: string | null;
			name?: string | null;
			email?: string | null;
			image?: string | null;
		};
	}
}

interface CustomProfile extends DefaultSession {
	profile?: {
		id?: string | null;
		name?: string | null;
		email?: string | null;
		picture?: string | null;
	};
}
