'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders, ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import Avatar from '@mui/material/Avatar';
import { Button } from './ui-components/Button/Button';
import Logo from '../assets/images/logo.svg';
import { BuiltInProviderType } from 'next-auth/providers';
type ProvidersType = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>;





const Nav = () => {
	const [providers, setProviders] = useState<ProvidersType | null>(null);
	const [toggleDropdown, setToggleDropdown] = useState(false)
	const { data: session } = useSession();


	useEffect(() => {
		const setUpProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		}
		setUpProviders()
	}, [])



	return (
		<nav className='flex justify-between w-full mb-16  pt-3'>
			<Link href={'/'} className='flex gap-2 flex-center'>
				<Logo className="fill-emerald-400 object-contain  w-7 h-7" />
				<h3 className='logo_text'>Insulin controller</h3>
			</Link>
			<div className='sm:flex hidden'>
				{session?.user ? (
					<div className='flex gap-3 md:gap-5'>
						<Button variant='ghost' type='button' onClick={() => { signOut() }} >
							Sign Out
						</Button>
						<Link href={'profile'}>
							<Avatar alt="avatar" src={session?.user.image || ""} />
						</Link>
					</div>
				) : (
					<>
						{providers && Object.values(providers).map((provider: any) => (
							<Button
								type='button'
								variant='primary'
								key={provider.name}
								onClick={() => signIn(provider.id)}
							>
								Sign In
							</Button>
						))}
					</>
				)}
			</div>
			{/* MObile Navigation */}
			<div className="sm:hidden flex relative">
				{session?.user ? (
					<div className="flex">
						<Avatar src={session?.user.image || ''}
							className="cursor-pointer"
							onClick={() => { setToggleDropdown((prev) => !prev) }} />
						{toggleDropdown && (
							<div className="dropdown shadow-md">
								<Link href="/profile" className="dropdown_link"
									onClick={() => setToggleDropdown(false)}
								>
									My Profile
								</Link>
								<Button type='button'
									variant='primary'
									onClick={() => {
										setToggleDropdown(false);
										signOut();
									}}>
									Sign Out
								</Button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers && Object.values(providers).map((provider: any) => (
							<Button
								type='button'
								key={provider.name}
								onClick={() => signIn(provider.id)}
								variant='ghost'
							>
								Sign In
							</Button>
						))}
					</>
				)}
			</div>
		</nav>
	)
}

export default Nav