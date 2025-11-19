import React, { type ButtonHTMLAttributes } from 'react';
import './Button.css'; // Importação do CSS

// Definição da API do Componente
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className = '',
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    iconLeft, 
    iconRight, 
    children, 
    disabled,
    ...props 
  }, ref) => {
    
    // Montagem das classes CSS
    const buttonClasses = [
      'exa-button',
      `exa-button--${variant}`,
      `exa-button--${size}`,
      isLoading ? 'exa-button--loading' : '',
      className
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* Renderização condicional do Spinner de Loading */}
        {isLoading && (
          <span className="exa-button__spinner">
            {/* Aqui entraria seu componente <Spinner size="sm" /> */}
            <svg viewBox="0 0 24 24" className="spinner-svg">...</svg>
          </span>
        )}

        {/* Conteúdo do Botão */}
        {!isLoading && iconLeft && <span className="exa-button__icon">{iconLeft}</span>}
        <span className="exa-button__label">{children}</span>
        {!isLoading && iconRight && <span className="exa-button__icon">{iconRight}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';