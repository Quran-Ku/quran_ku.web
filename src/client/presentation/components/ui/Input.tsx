import React, { InputHTMLAttributes, forwardRef, ReactNode } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  clearable?: boolean;
  onClear?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, clearable, onClear, value, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {icon && (
          <div className="absolute left-3.5 text-gray-400 dark:text-dark-textMuted flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          value={value}
          className={twMerge(
            clsx(
              "w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:border-primary-1 focus:outline-none focus:ring-2 focus:ring-primary-1/20 dark:border-dark-border dark:bg-dark-surface dark:text-dark-textPrimary dark:placeholder:text-dark-textMuted dark:focus:border-primary-3",
              icon && "pl-10",
              clearable && "pr-10",
              className
            )
          )}
          {...props}
        />
        {clearable && value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-dark-textPrimary transition-colors"
            aria-label="Clear input"
          >
            ✕
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
