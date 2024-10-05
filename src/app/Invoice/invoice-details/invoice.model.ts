// list-invoice.component.ts

export interface Invoice {
    billId: string;               // Assuming billId is a string
  meterNumber: string;          // Assuming meterNumber is a string
  monthOfTheBill: string;       // Change to string for formatted date
  dueDate: string;              // Change to string for formatted date
  amount: number;               // Amount should be a number
  discount: number;             // Discount should be a number
  unitConsumption: number;      // Unit consumption should be a number
  paymentStatus: string; 
  }
  