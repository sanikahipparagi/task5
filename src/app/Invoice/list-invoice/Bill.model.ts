import { PaymentStatus } from "./PaymentStatus.enum";
import {User} from '../../Customer/customer-data/User.model';

export interface Bill {
    billId: string;                 // Unique identifier for the bill
    user?: User;                 // Assuming you want to reference the user ID directly
    monthOfTheBill: Date;           // The date representing the month of the bill
    unitConsumption: number;        // Number of units consumed
    dueDate: Date;                  // Due date for the bill payment
    discount: number;               // Discount applicable
    amount: number;                 // Total amount due
    meterNumber: string;            // Meter number associated with the bill
    paymentStatus?: PaymentStatus;  // Status of the payment (optional)
}