import React from 'react';
import clsx from 'clsx';

interface ButtonInterface {
    children: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

const Button: React.FC<ButtonInterface> = ({ children, onClick, className }) => {
  return (
    <button
            className={clsx(
                'rounded-lg',
                'px-4',
                'py-2',
                'bg-black',
                'text-white',
                className
            )}
            onClick={onClick}
        >
            {children}
        </button>
  );
};

export default Button;
