import React, { useState } from 'react';
import {
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Group, Expense } from '../types';
import { convertCurrency } from '../utils/currencyConverter';

interface ExpenseStatsProps {
    expenses: Expense[];
    group: Group;
}

const ExpenseStats: React.FC<ExpenseStatsProps> = ({ expenses, group }) => {
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [displayCurrency, setDisplayCurrency] = useState('TWD');

    const processExpenseData = () => {
        const filteredExpenses = selectedUser
            ? expenses.filter(expense =>
                expense.splitDetails.some(split => split.userId === selectedUser)
            )
            : expenses;

        const categoryTotals = filteredExpenses.reduce((acc, expense) => {
            const convertedAmount = convertCurrency(expense.amount, expense.currency, displayCurrency);
            acc[expense.category] = (acc[expense.category] || 0) + convertedAmount;
            return acc;
        }, {} as { [key: string]: number });

        return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
    };

    const data = processExpenseData();
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    return (
        <div>
            <Typography variant="h6">支出統計</Typography>
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                <FormControl fullWidth>
                    <InputLabel>選擇成員</InputLabel>
                    <Select
                        value={selectedUser || ''}
                        onChange={(e) => setSelectedUser(e.target.value || null)}
                        label="選擇成員"
                    >
                        <MenuItem value="">全部成員</MenuItem>
                        {group.members.map(member => (
                            <MenuItem key={member.id} value={member.id}>
                                {member.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel>顯示幣別</InputLabel>
                    <Select
                        value={displayCurrency}
                        onChange={(e) => setDisplayCurrency(e.target.value)}
                        label="顯示幣別"
                    >
                        <MenuItem value="TWD">新台幣</MenuItem>
                        <MenuItem value="USD">美元</MenuItem>
                        <MenuItem value="JPY">日圓</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ExpenseStats;