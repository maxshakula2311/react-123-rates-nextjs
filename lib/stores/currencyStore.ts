import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ExchangeInfo {
  to: string;
  from: string;
  amount: number;
  rate: number;
  result: number;
}

type CurrencyState = {
  baseCurrency: string;
  hasHydrated: boolean;
  exchangeInfo: ExchangeInfo | null;
  isLoading: boolean;
  isError: null | string;
  setIsError: (error: null | string) => void;
  setIsLoading: (loading: boolean) => void;
  setExchangeInfo: (info: ExchangeInfo | null) => void;
  setHasHydrated: (state: boolean) => void;
  setBaseCurrency: (currency: string) => void;
};

export const useCurrStore = create<CurrencyState>()(persist((set) => ({
    baseCurrency: "",
    hasHydrated: false,
    exchangeInfo: null,
    isLoading: false,
    isError: null,    
    setIsError: (error) => set({isError: error}),
    setIsLoading: (loading) => set({isLoading: loading}),
    setExchangeInfo: (info) => set({exchangeInfo: info}),
    setHasHydrated: (state) => set({hasHydrated: state}),
    setBaseCurrency: (currency) => set({baseCurrency: currency})
}), {
    name: 'currency-storage',
    partialize: (state) => ({ baseCurrency: state.baseCurrency }),
    onRehydrateStorage: () => (state) => {
      state?.setHasHydrated(true);
    }}))