'use client'
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { Post } from './types';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import dayjs from 'dayjs';

interface IProps {
	post: Post,
	handleTagClick?: (tag: string) => void,
	handleEdit?: () => void,
	handleDelete?: () => void,
}



const DosageCard: React.FC<IProps> = ({ post, handleTagClick, handleEdit, handleDelete }) => {
	const { data: session } = useSession();
	const pathName = usePathname();
	const router = useRouter();
	const { creator, injection, createdAt } = post
	const { username, image, email } = post?.creator || {}
	const [copy, setCopied] = useState("")
	const date = dayjs(createdAt);
	const formateDate = date.format('D MMMM YYYY, HH:mm:ss')

	const handleCopy = () => {
		setCopied(injection);
		navigator.clipboard.writeText(injection);
		setTimeout(() => setCopied(""), 3000);
	}

	return (
		<div className='dosage_card'>
			<div className='flex justify-between items-start gap-5'>
				<div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
					<Avatar src={image} alt="user_image" />
					<div className="flex flex-col">
						<h3 className='font-satoshi font-semibold text-grey-900'>
							{username}
						</h3>
						<p className="font-inter text-sm text-gray-500">
							{email}
						</p>
					</div>
				</div>
				<div className="copy_btn" onClick={handleCopy}>
					{copy === injection
						? <ContentCopyIcon color="success" />
						: <ContentCopyIcon color='primary' />}
				</div>
			</div>
			<p className='my-4 font-satoshi text-sm text-gray-700'>Dosage long insulin: {injection}</p>
			<p className="font-inter text-sm blue_gradient cursor-pointer"
				onClick={() => handleTagClick && handleTagClick(formateDate)}
			>
				Data injection:	{formateDate}
			</p>

			{session?.user.id === post?.creator?._id && pathName === '/profile' && (
				<div className='flex mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
					<p className="font-inter text-sm green_gradient cursor-pointer"
						onClick={handleEdit}
					>
						Edit
					</p>
					<p className="font-inter text-sm orange_gradient cursor-pointer"
						onClick={handleDelete}
					>
						Delete
					</p>
				</div>
			)}
		</div>
	)
}

export default DosageCard