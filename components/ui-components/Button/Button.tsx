import { ButtonProps } from './Button.props';
import classNames from 'classnames';


export const Button = ({ variant, children, className, ...props }: ButtonProps) => {
	const buttonStyles = classNames(
		'py-2 px-4 shadow-md text-whited text-sm font-inter text-base leading-[1.25rem] transition-all duration-300',
		{
			' hover:bg-emerald-600 bg-emerald-500 text-white': variant === 'primary',
			' hover:bg-white text-gray-500 ': variant === 'ghost',
		}
	);
	return (
		<button
			{...props}
			className={buttonStyles}
		>
			{children}
		</button>
	)
}