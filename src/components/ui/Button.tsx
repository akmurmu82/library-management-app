interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'medium',
    className,
    ...props
}) => {
    const baseStyles = 'rounded font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center gap-2';
    const variantStyles = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 focus:ring-blue-500',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 focus:ring-gray-500',
        danger: 'bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 focus:ring-red-500',
    };
    const sizeStyles = {
        small: 'px-2 py-1 text-xs sm:text-sm',
        medium: 'px-3 sm:px-4 py-2 text-sm sm:text-base',
        large: 'px-4 sm:px-6 py-3 text-base sm:text-lg',
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            {...props}
        >
            {props.children}
        </button>
    );
};

export default Button;