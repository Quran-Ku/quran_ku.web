import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-1 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-6 py-3 gap-2.5 font-semibold",
    };

    const variantStyles = {
      primary:
        "bg-primary-1 text-white hover:bg-primary-2 shadow-sm hover:shadow-soft active:bg-primary-dark",
      gradient:
        "bg-brand-gradient text-white hover:bg-brand-gradient-hover shadow-soft hover:shadow-glow",
      secondary:
        "bg-primary-light text-primary-1 hover:bg-opacity-80 dark:bg-dark-surface dark:text-primary-3 dark:hover:bg-dark-card border border-primary-1/10 dark:border-dark-border",
      outline:
        "bg-transparent border border-primary-1 text-primary-1 hover:bg-primary-1 hover:text-white dark:border-primary-3 dark:text-primary-3 dark:hover:bg-primary-3 dark:hover:text-white",
      ghost:
        "bg-transparent text-gray-700 hover:bg-gray-100 dark:text-dark-textPrimary dark:hover:bg-dark-surface",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={twMerge(
          clsx(
            baseStyles,
            sizeStyles[size],
            variantStyles[variant],
            fullWidth && "w-full",
            className
          )
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
