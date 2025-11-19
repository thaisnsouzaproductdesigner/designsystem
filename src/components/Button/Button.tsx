import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';
import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Estilo visual do botão */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  /** Tamanho e densidade */
  size?: 'sm' | 'md' | 'lg';
  /** Estado de carregamento */
  isLoading?: boolean;
  /** Ícone à esquerda do texto */
  iconLeft?: React.ReactNode;
  /** Ícone à direita do texto */
  iconRight?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      iconLeft,
      iconRight,
      disabled,
      ...props
    },
    ref
  ) => {
    // Combinação de classes dinâmica
    const classes = clsx(
      'exa-button',
      `exa-button--${variant}`,
      `exa-button--${size}`,
      { 'exa-button--loading': isLoading },
      className
    );

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="exa-button__spinner">
            {/* SVG Simples de Loading */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
              <path d="M8 1C11.866 1 15 4.13401 15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        ) : (
          <>
            {iconLeft && <span className="exa-button__icon">{iconLeft}</span>}
            {children}
            {iconRight && <span className="exa-button__icon">{iconRight}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';