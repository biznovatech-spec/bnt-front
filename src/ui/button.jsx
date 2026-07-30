import { Link } from 'react-router-dom';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.98] cursor-pointer',
    {
        variants: {
            variant: {
                primary: 'bg-surface-dark text-white hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/10 border border-transparent',
                secondary: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 hover:border-gray-400',
                accent: 'bg-primary text-white hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20',
                ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
            },
            size: {
                sm: 'px-4 py-2 text-sm',
                md: 'px-6 py-3 text-base',
                lg: 'px-8 py-4 text-lg',
                icon: 'p-3',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
);

// eslint-disable-next-line react-refresh/only-export-components
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Button({ 
    children, 
    variant, 
    size, 
    className, 
    to, 
    href, 
    onClick,
    type = 'button',
    ...props
}) {
    const combinedClasses = cn(buttonVariants({ variant, size, className }));

    if (to) {
        return (
            <Link to={to} className={combinedClasses} onClick={onClick} {...props}>
                {children}
            </Link>
        );
    }

    if (href) {
        return (
            <a 
                href={href} 
                className={combinedClasses} 
                onClick={onClick} 
                target={href.startsWith('http') ? '_blank' : undefined} 
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                {...props}
            >
                {children}
            </a>
        );
    }

    return (
        <button type={type} className={combinedClasses} onClick={onClick} {...props}>
            {children}
        </button>
    );
}