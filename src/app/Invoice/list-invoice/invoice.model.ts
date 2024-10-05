

export interface Invoice {
  address: string;
  email: string;
  isActive: boolean;
  isBlocked: boolean;
  amount: number;
  billId: string; // Make sure to include this in the model
  discount: number;
  dueDate: string;
  meterNumber: string;
  monthOfTheBill: string;
  paymentStatus: string;
  txnList: any[];
  unitConsumption: number;
  name: string; // Important for filtering
  phNo: string;
  userId: string;
}
