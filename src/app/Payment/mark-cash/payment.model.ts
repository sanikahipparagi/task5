export interface Transaction {
  txnId: string;                       // Transaction ID
  billId: string;                      // Bill ID
  customerId: string;                  // Customer ID
  amount: number;                      // Amount of the transaction
  paymentMethod: string;               // Payment method
  transactionStatus: string;           // Transaction status
  isPaid: boolean;                     // Indicates if the transaction is paid
  updatedAt: Date;                     // Last updated timestamp
}
