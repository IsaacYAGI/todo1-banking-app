export interface Movement{
    amount: number;
    date: Date | number;
    description: string;
    movement_type: "INCOME" | "OUTCOME";
    target_account: string;
    source_account?: string;
}