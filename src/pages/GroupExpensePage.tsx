import React, { useState } from 'react';
import { Group, Expense, User } from '../types';
import GroupManagement from '../components/GroupManagement';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseStats from '../components/ExpenseStats';

const GroupExpensePage: React.FC = () => {
    const [group, setGroup] = useState<Group>({
        id: '1',
        name: '旅遊記帳群組',
        bulletin: '歡迎大家一起記帳！',
        members: [],
        inviteLink: ''
    });

    const [expenses, setExpenses] = useState<Expense[]>([]);

    const handleUpdateBulletin = (bulletin: string) => {
        setGroup(prev => ({ ...prev, bulletin }));
    };

    const handleInviteMembers = (invitees: string[]) => {
        // 實現邀請邏輯
    };

    const handleRemoveMember = (userId: string) => {
        setGroup(prev => ({
            ...prev,
            members: prev.members.filter(member => member.id !== userId)
        }));
    };

    const handleSubmitExpense = (expense: Expense) => {
        setExpenses(prev => [...prev, expense]);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{group.name}</h1>

            <GroupManagement
                group={group}
                onUpdateBulletin={handleUpdateBulletin}
                onInviteMembers={handleInviteMembers}
                onRemoveMember={handleRemoveMember}
            />

            <ExpenseForm
                group={group}
                onSubmitExpense={handleSubmitExpense}
            />

            <ExpenseStats
                expenses={expenses}
                group={group}
            />
        </div>
    );
};

export default GroupExpensePage;