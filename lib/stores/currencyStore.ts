import { create } from "zustand";
import { persist } from "zustand/middleware";

type CurrencyState = {
  baseCurrency: string;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  setBaseCurrency: (currency: string) => void;
};

export const useCurrStore = create<CurrencyState>()(persist((set) => ({
    baseCurrency: "",
    hasHydrated: false,
    setHasHydrated: (state) => set({hasHydrated: state}),
    setBaseCurrency: (currency) => set({baseCurrency: currency})
}), {
    name: 'currency-storage',
    partialize: (state) => ({ baseCurrency: state.baseCurrency }),
    onRehydrateStorage: () => (state) => {
      state?.setHasHydrated(true);
    }}))