import { Account } from "./account";
export interface Client{
    birthdate: Date;
    email: string;
    name: string;
    lastname: string;
    accounts: Account[];
}