import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  pageSize?: number;
  itemLabel?: string;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
  itemLabel = "Item",
  className,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = (): (number | "ellipsis")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "ellipsis", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "ellipsis",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "ellipsis",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis",
      totalPages,
    ];
  };

  const pages = getPageNumbers();

  const startItem =
    totalItems !== undefined && pageSize !== undefined
      ? (currentPage - 1) * pageSize + 1
      : undefined;
  const endItem =
    totalItems !== undefined && pageSize !== undefined
      ? Math.min(currentPage * pageSize, totalItems)
      : undefined;

  return (
    <div
      className={twMerge(
        "flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-100 dark:border-dark-border",
        className
      )}
    >
      {/* Item info counter */}
      <div className="text-xs sm:text-sm text-gray-500 dark:text-dark-textMuted order-2 sm:order-1 text-center sm:text-left">
        {totalItems !== undefined && startItem !== undefined && endItem !== undefined ? (
          <span>
            Menampilkan <span className="font-semibold text-gray-800 dark:text-dark-textPrimary">{startItem}</span>–
            <span className="font-semibold text-gray-800 dark:text-dark-textPrimary">{endItem}</span> dari{" "}
            <span className="font-semibold text-gray-800 dark:text-dark-textPrimary">{totalItems}</span> {itemLabel}
          </span>
        ) : (
          <span>
            Halaman <span className="font-semibold text-gray-800 dark:text-dark-textPrimary">{currentPage}</span> dari{" "}
            <span className="font-semibold text-gray-800 dark:text-dark-textPrimary">{totalPages}</span>
          </span>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-1 sm:gap-1.5 order-1 sm:order-2">
        {/* First Page */}
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          aria-label="Halaman Pertama"
          className="p-2 rounded-xl text-gray-600 dark:text-dark-textMuted hover:bg-gray-100 dark:hover:bg-dark-card disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        {/* Previous Page */}
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          aria-label="Halaman Sebelumnya"
          className="p-2 rounded-xl text-gray-600 dark:text-dark-textMuted hover:bg-gray-100 dark:hover:bg-dark-card disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Number Buttons */}
        <div className="flex items-center gap-1">
          {pages.map((p, idx) => {
            if (p === "ellipsis") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="w-8 h-8 flex items-center justify-center text-xs text-gray-400 dark:text-dark-textMuted select-none"
                >
                  •••
                </span>
              );
            }

            const isActive = p === currentPage;
            return (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                aria-current={isActive ? "page" : undefined}
                className={twMerge(
                  clsx(
                    "min-w-[34px] h-[34px] sm:min-w-[36px] sm:h-[36px] px-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center",
                    isActive
                      ? "bg-primary-1 text-white shadow-soft font-bold scale-105"
                      : "text-gray-700 dark:text-dark-textPrimary hover:bg-gray-100 dark:hover:bg-dark-card"
                  )
                )}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Next Page */}
        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          aria-label="Halaman Selanjutnya"
          className="p-2 rounded-xl text-gray-600 dark:text-dark-textMuted hover:bg-gray-100 dark:hover:bg-dark-card disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Last Page */}
        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Halaman Terakhir"
          className="p-2 rounded-xl text-gray-600 dark:text-dark-textMuted hover:bg-gray-100 dark:hover:bg-dark-card disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
