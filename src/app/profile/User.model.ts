// src/app/Customer/customer-data/User.model.ts
export interface User {
    userId: string;
    name: string;
    email: string;
    phNo: string;
    address: string;
    meterNumber?: string; // Optional fields
    isActive?: boolean;   // Optional
    isBlocked?: boolean;  // Optional
    wallet?: number;      // Optional
  }
  