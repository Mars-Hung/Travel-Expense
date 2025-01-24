export interface User {
    id: string;  // 確保 id 是 string
    email?: string | null;
    name?: string | null;
    lineId?: string;
    role?: 'admin' | 'member';
}

export interface Group {
    id: string;
    name: string;
    bulletin: string;
    members: User[];
    inviteLink: string;
}

export interface Expense {
    id: string;
    amount: number;
    currency: string;
    category: ExpenseCategory;
    paidBy: string;
    splitDetails: {
        userId: string;
        amount: number;
    }[];
    description?: string;
    date: Date;
    image?: string;
    sharedInChat: boolean;
}

export type ExpenseCategory =
    'food' | 'transport' | 'entertainment' | 'accommodation' | 'other';

export interface ExchangeRate {
    from: string;
    to: string;
    rate: number;
}