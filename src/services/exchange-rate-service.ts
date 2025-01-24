import axios from 'axios';

const EXCHANGE_RATE_API_KEY = process.env.REACT_APP_EXCHANGE_RATE_API_KEY;
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

export interface ExchangeRates {
    [currency: string]: number;
}

export const fetchLatestExchangeRates = async (baseCurrency: string = 'USD'): Promise<ExchangeRates> => {
    try {
        const response = await axios.get(`${BASE_URL}/${EXCHANGE_RATE_API_KEY}/latest/${baseCurrency}`);
        return response.data.conversion_rates;
    } catch (error) {
        console.error('匯率獲取失敗', error);

        // 備用匯率（避免 API 錯誤）
        return {
            'TWD': 31.2,
            'USD': 1,
            'JPY': 134.5,
            'EUR': 0.92
        };
    }
};

export const convertCurrency = (
    amount: number,
    fromCurrency: string,
    toCurrency: string,
    rates: ExchangeRates
): number => {
    if (fromCurrency === toCurrency) return amount;

    const usdAmount = amount / rates[fromCurrency];
    return usdAmount * rates[toCurrency];
};