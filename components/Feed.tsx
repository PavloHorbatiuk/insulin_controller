"use client"
import { useState, useEffect } from 'react';

import axios from 'axios';
import DosageCard from './DosageCard';
import { useSession } from 'next-auth/react';
import useStore from 'store/store';


interface IProps {


}
const DosageCardList = ({ data, handleTagClick }) => {
	return (
		<div className='mt-16 prompt_layout'>
			{data.map((post) => (
				<DosageCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	)
}


const Feed: React.FC<IProps> = ({ }) => {
	const { data: session } = useSession();
	const [searchText, setSearchText] = useState<string>('');
	const { posts, setPosts } = useStore();
	const handleSearchChange = (e) => {

	}

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await axios.get('/api/dosage')
			const { data } = await response;
			setPosts(data);
		}
		if (session && session.user?.id) {
			fetchPosts();
		}
	}, [session, setPosts])

	const filteredPosts = posts.filter(post => post.creator._id === session?.user.id)

	return (
		<section className='feed'>
			<DosageCardList
				data={filteredPosts}
				handleTagClick={() => { }}
			/>
		</section>
	)
}

export default Feed