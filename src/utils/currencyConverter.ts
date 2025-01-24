import { Expense, ExchangeRate } from '../types';

const EXCHANGE_RATES: ExchangeRate[] = [
    { from: 'TWD', to: 'USD', rate: 0.032 },
    { from: 'USD', to: 'TWD', rate: 31.2 },
    { from: 'TWD', to: 'JPY', rate: 4.5 },
    { from: 'JPY', to: 'TWD', rate: 0.22 },
];

export function convertCurrency(amount: number, fromCurrency: string, toCurrency: string): number {
    if (fromCurrency === toCurrency) return amount;

    const exchangeRate = EXCHANGE_RATES.find(
        rate => rate.from === fromCurrency && rate.to === toCurrency
    );

    if (!exchangeRate) {
        throw new Error(`No exchange rate found for ${fromCurrency} to ${toCurrency}`);
    }

    return amount * exchangeRate.rate;
}

export function calculateTotalInCurrency(expenses: Expense[], targetCurrency: string): number {
    return expenses.reduce((total, expense) => {
        const convertedAmount = convertCurrency(expense.amount, expense.currency, targetCurrency);
        return total + convertedAmount;
    }, 0);
}