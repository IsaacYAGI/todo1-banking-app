export interface Movement{
    amount: number;
    date: Date;
    description: string;
    movement_type: "INCOME" | "OUTCOME";
    targe_account: string;
    source_account?: string;
}