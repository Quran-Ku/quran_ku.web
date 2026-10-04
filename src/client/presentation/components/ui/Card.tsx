import React, { HTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  bordered?: boolean;
}

export function Card({
  className,
  hoverable = false,
  bordered = true,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          "rounded-2xl bg-white p-5 text-gray-900 transition-all dark:bg-dark-card dark:text-dark-textPrimary",
          bordered && "border border-gray-100 dark:border-dark-border",
          hoverable &&
            "hover:-translate-y-1 hover:border-primary-1/30 hover:shadow-soft-lg dark:hover:border-primary-3/30 cursor-pointer",
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}
