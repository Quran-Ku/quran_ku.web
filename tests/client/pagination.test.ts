import { describe, it, expect } from "vitest";

describe("Pagination Utility Calculations", () => {
  it("should calculate correct total pages and slice boundaries", () => {
    const totalItems = 114;
    const pageSize = 12;
    const totalPages = Math.ceil(totalItems / pageSize);

    expect(totalPages).toBe(10);

    // Page 1
    const page1Start = (1 - 1) * pageSize;
    const page1End = Math.min(1 * pageSize, totalItems);
    expect(page1Start).toBe(0);
    expect(page1End).toBe(12);

    // Last Page (Page 10)
    const page10Start = (10 - 1) * pageSize;
    const page10End = Math.min(10 * pageSize, totalItems);
    expect(page10Start).toBe(108);
    expect(page10End).toBe(114);
    expect(page10End - page10Start).toBe(6);
  });

  it("should handle empty or single page gracefully", () => {
    const totalItems = 0;
    const pageSize = 12;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    expect(totalPages).toBe(1);

    const singleItemTotal = 5;
    const singleItemPages = Math.max(1, Math.ceil(singleItemTotal / pageSize));
    expect(singleItemPages).toBe(1);
  });
});
