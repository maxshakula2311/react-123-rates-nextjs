'use client';

import { RiExchangeDollarFill } from 'react-icons/ri';

import styles from './ExchangeForm.module.css';
import { exchangeCurrency } from '@/lib/service/exchangeAPI';
import { useCurrStore } from '@/lib/stores/currencyStore';

export default function ExchangeForm() {
  const setExchangeInfo = useCurrStore((state) => state.setExchangeInfo);
  const setIsError = useCurrStore((state) => state.setIsError);
  const setIsLoading = useCurrStore((state) => state.setIsLoading);
  const formHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const currency = formData.get("currency") as string;
    const resultInput = currency.trim();
    const [amount, from, , to] = resultInput.split(" ");
    try {
      setIsLoading(true);
      setIsError(null);
      setExchangeInfo(null);
      const data = await exchangeCurrency({amount: Number(amount), from, to});
      setExchangeInfo(data);
    } catch {
      setIsError("Sorry! The error had happened!");
      setExchangeInfo(null);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <form className={styles.form} onSubmit={formHandle}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        type="text"
        pattern="^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$"
        placeholder="15 USD in UAH"
        title="Request format 15 USD in UAH"
        className={styles.input}
        name="currency"
        required
      />
    </form>
  );
}
