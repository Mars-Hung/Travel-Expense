import { createClient } from '@supabase/supabase-js';
import { User, Group, Expense } from '../types';

const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL!,
    process.env.REACT_APP_SUPABASE_ANON_KEY!
);

export const saveUserToSupabase = async (user: Partial<User>) => {
    const { data, error } = await supabase
        .from('users')
        .upsert({
            id: user.id,
            email: user.email,
            name: user.name
        });

    if (error) console.error('保存用戶錯誤', error);
    return data;
};

export const createGroup = async (group: Group) => {
    const { data, error } = await supabase
        .from('groups')
        .insert(group);

    if (error) console.error('創建群組錯誤', error);
    return data;
};

export const addExpenseToGroup = async (expense: Expense) => {
    const { data, error } = await supabase
        .from('expenses')
        .insert(expense);

    if (error) console.error('新增支出錯誤', error);
    return data;
};

export const fetchGroupExpenses = async (groupId: string) => {
    const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('groupId', groupId);

    if (error) console.error('讀取支出錯誤', error);
    return data;
};