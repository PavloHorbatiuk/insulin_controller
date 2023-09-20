export interface Post {
	_id: string;
	creator: User;
	injection: string;
	createdAt: string;
}
export interface User {
	_id: string;
	image: string;
	email: string;
	username: string;
}
