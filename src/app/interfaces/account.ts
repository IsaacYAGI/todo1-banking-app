import { Movement } from "./movement";

export interface Account{
    account_number: string;
    account_type: "SAVINGS" | "CHECKS";
    amount: number;
    currency: string;
    movements: Movement[]
}