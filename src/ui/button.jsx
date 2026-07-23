import { Link } from 'react-router-dom';

export default function Button({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    className = '', 
    to, 
    href, 
    onClick,
    type = 'button' 
}) {
    const variants = {
        'primary' : 'p-3 gap-4 border border-gray-100 text-white bg-surface-dark rounded-md w-fit flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        'secondary' : 'p-3 gap-4 border border-gray-300 text-base font-semibold flex items-center justify-center rounded-md w-fit cursor-pointer hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        'accent' : ''
    }
    const sizes = {
        'sm' : 'px-4 py-2',
        'md' : 'px-6 py-3',
        'lg' : 'px-8 py-4',
        'base': '' // fallback if size='base' was used
    }

    const combinedClasses = `${variants[variant]} ${sizes[size] || ''} ${className}`;

    if (to) {
        return (
            <Link to={to} className={combinedClasses} onClick={onClick}>
                {children}
            </Link>
        );
    }

    if (href) {
        return (
            <a href={href} className={combinedClasses} onClick={onClick} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                {children}
            </a>
        );
    }

    return (
        <button type={type} className={combinedClasses} onClick={onClick}>
            {children}
        </button>
    );
}