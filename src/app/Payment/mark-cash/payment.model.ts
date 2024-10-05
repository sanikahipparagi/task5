export interface Transaction {
    txnId: string;
    billId: string;
    customerId: string;
    amount: number;
    paymentMethod: 'CASH' | 'CREDIT CARD' | 'WALLET' | 'DEBIT CARD'; // Add other payment methods if needed
    transactionStatus: 'PENDING' | 'PAID';
    isPaid?: boolean; // Optional, used to mark if payment is completed
  }
  