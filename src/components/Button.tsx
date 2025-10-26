interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'welcome';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
  className = '',
}: ButtonProps) {
  const baseStyles = 'font-gotham font-medium text-15 transition-colors duration-200 rounded';

  const variantStyles = {
    primary: disabled
      ? 'bg-background-disabled text-[#A2A9AD] cursor-not-allowed'
      : 'bg-banorte-red text-banorte-white hover:bg-banorte-red-hover px-30 py-12 h-45',
    secondary: disabled
      ? 'bg-background-disabled text-[#A2A9AD] cursor-not-allowed'
      : 'bg-text-primary text-banorte-white hover:bg-banorte-red-hover px-30 py-12 h-45',
    tertiary: disabled
      ? 'text-[#A2A9AD] cursor-not-allowed'
      : 'text-banorte-red-hover hover:text-banorte-red-hover underline',
    welcome: disabled
      ? 'bg-background-disabled text-[#A2A9AD] cursor-not-allowed'
      : 'px-[40px] py-[17px] rounded-[10px] bg-[rgb(255,56,86)] text-white shadow-[rgb(201,46,70)_0px_10px_0px_0px] hover:shadow-[rgb(201,46,70)_0px_7px_0px_0px] active:shadow-[rgb(201,46,70)_0px_0px_0px_0px] active:translate-y-[5px] active:transition-[200ms] cursor-pointer tracking-[1.5px] animate-pulse-glow',
  };

  if (variant === 'primary') {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} relative flex items-center justify-center px-30 py-12 h-45 overflow-hidden transition-all rounded-md group ${
          disabled
            ? 'bg-background-disabled cursor-not-allowed'
            : 'bg-banorte-red'
        } ${className}`}
      >
        {!disabled && (
          <>
            <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-banorte-red-hover rounded group-hover:-mr-4 group-hover:-mt-4">
              <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-banorte-red-hover rounded group-hover:-ml-4 group-hover:-mb-4">
              <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-banorte-red-hover rounded-md group-hover:translate-x-0"></span>
          </>
        )}
        <span className={`relative w-full text-center transition-colors duration-200 ease-in-out ${
          disabled ? 'text-[#A2A9AD]' : 'text-white group-hover:text-white'
        }`}>
          {children}
        </span>
      </button>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
