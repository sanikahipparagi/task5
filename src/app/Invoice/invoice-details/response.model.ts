// response.model.ts
export interface ApiResponse<T> {
    error: boolean;
    message: string;
    status: number;
    data: T; // The data can be of any type, in your case, it's an Invoice
}