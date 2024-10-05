// user.model.ts

export interface User {
    
    userId: string;               // Unique identifier for the user (changed from userid to userId)
    name: string;                 // Name of the user
    meterNumber: string;          // Meter number
    phNo: string;                 // Phone number
    email: string;                // Email address
    address: string;              // Address (newly added)
    isActive: boolean;            // Active status
    isBlocked: boolean;           // Blocked status
    wallet: {
        balance: number;          // Wallet balance
        walletId: string;        // Wallet ID
    };
}
