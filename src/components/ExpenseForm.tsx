import React, { useState } from 'react';
import {
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography
} from '@mui/material';
import { Group, Expense, ExpenseCategory } from '../types';
import { convertCurrency } from '../utils/currencyConverter';

const EXPENSE_CATEGORIES: { value: ExpenseCategory, label: string }[] = [
    { value: 'food', label: '🍽️ 食物' },
    { value: 'transport', label: '🚗 交通' },
    { value: 'entertainment', label: '🎮 娛樂' },
    { value: 'accommodation', label: '🏨 住宿' },
    { value: 'other', label: '💡 其他' }
];

const CURRENCIES = ['TWD', 'USD', 'JPY', 'EUR'];

interface ExpenseFormProps {
    group: Group;
    onSubmitExpense: (expense: Expense) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ group, onSubmitExpense }) => {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('TWD');
    const [category, setCategory] = useState<ExpenseCategory>('other');
    const [participants, setParticipants] = useState<string[]>([]);
    const [customSplit, setCustomSplit] = useState<{ [key: string]: number }>({});
    const [isCustomSplit, setIsCustomSplit] = useState(false);
    const [paidBy, setPaidBy] = useState('');
    const [description, setDescription] = useState('');
    const [sharedInChat, setSharedInChat] = useState(false);

    const handleSubmit = () => {
        const baseAmount = parseFloat(amount);

        const defaultSplit = participants.map(userId => ({
            userId,
            amount: baseAmount / participants.length
        }));

        const splitDetails = isCustomSplit
            ? Object.entries(customSplit).map(([userId, amount]) => ({ userId, amount }))
            : defaultSplit;

        const newExpense: Expense = {
            id: Date.now().toString(),
            amount: baseAmount,
            currency,
            category,
            paidBy,
            splitDetails,
            description,
            date: new Date(),
            sharedInChat
        };

        onSubmitExpense(newExpense);
    };

    return (
        <div style={{ marginBottom: 16 }}>
            <Typography variant="h6">新增支出</Typography>
            <TextField
                fullWidth
                type="number"
                label="金額"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                variant="outlined"
                margin="normal"
            />

            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>選擇幣別</InputLabel>
                <Select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as string)}
                    label="選擇幣別"
                >
                    {CURRENCIES.map(curr => (
                        <MenuItem key={curr} value={curr}>{curr}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>選擇類別</InputLabel>
                <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                    label="選擇類別"
                >
                    {EXPENSE_CATEGORIES.map(cat => (
                        <MenuItem key={cat.value} value={cat.value}>
                            {cat.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button
                variant="contained"
                onClick={handleSubmit}
                style={{ marginTop: 16 }}
            >
                新增支出
            </Button>
        </div>
    );
};

export default ExpenseForm;