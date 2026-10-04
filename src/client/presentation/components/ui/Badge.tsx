import React, { HTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "outline";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const sizeStyles = {
    sm: "text-[11px] px-2.5 py-0.5 font-medium",
    md: "text-xs px-3 py-1 font-semibold",
  };

  const variantStyles = {
    primary:
      "bg-primary-light text-primary-1 dark:bg-primary-1/20 dark:text-primary-3",
    secondary:
      "bg-gray-100 text-gray-700 dark:bg-dark-surface dark:text-dark-textMuted",
    success:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    warning:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    outline:
      "border border-primary-1/30 text-primary-1 dark:border-primary-3/30 dark:text-primary-3",
  };

  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center rounded-full transition-colors",
          sizeStyles[size],
          variantStyles[variant],
          className
        )
      )}
      {...props}
    >
      {children}
    </span>
  );
}
