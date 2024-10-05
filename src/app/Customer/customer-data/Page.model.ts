// page.model.ts

export interface Page<T> {
    data: T[];            // Array of items on the current page
    totalPages: number;      // Total number of pages
    // totalElements: number;    // Total number of elements across all pages
    size: number;            // Number of items per page
    number: number;          // Current page number (0-indexed)
}
