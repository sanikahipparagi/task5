export interface ApiResponse<T> {
    data: T;                // The data returned from the API
    totalPages: string;     // Total number of pages as string
    status: number;
    message : string;         // HTTP status code
  }
  