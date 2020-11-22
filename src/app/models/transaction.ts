export class Transaction{
    id: number;
    type: string;
    transactionDate: string;
    status: string;
    payeeAccountId: number;
    payerAccountId: number;
    medium: string;
    amount: number;
    description: string;
}