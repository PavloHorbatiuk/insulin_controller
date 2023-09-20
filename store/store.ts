import { create } from 'zustand';

interface Post {
	_id: string;
	creator: {
		_id: string;
		email: string;
		username: string;
		image: string;
		createdAt: Date;
		updatedAt: Date;
	};
	injection: number;
	createdAt: Date;
}

interface StoreState {
	posts: Post[];
	setPosts: (newPosts: Post[]) => void;
}

const useStore = create<StoreState>(set => ({
	posts: [],
	setPosts: newPosts => set({ posts: newPosts }),
}));

export default useStore;
