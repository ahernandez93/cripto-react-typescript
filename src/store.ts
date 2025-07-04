import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CryptoCurrency } from "./types";
import { fetchCurrentCryptoPrice, getCryptos } from "./services/CryptoService";
import { Pair } from "./types";
import { CryptoPrice } from "./types";

type CryptoStore = {
    cryptocurrencies: CryptoCurrency[];
    result: CryptoPrice;
    fetchCryptos: () => Promise<void>;
    fetchData: (pair: Pair) => Promise<void>;
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptocurrencies: [],
    result: {
        IMAGEURL: '',
        PRICE: '',
        HIGHDAY: '',
        LOWDAY: '',
        CHANGEPCT24HOUR: '',
        LASTUPDATE: '',
    },
    fetchCryptos: async () => {
        const cryptocurrencies = await getCryptos();
        set(() => ({
            cryptocurrencies
        }));
    },
    fetchData: async (pair) => {
        const result = await fetchCurrentCryptoPrice(pair);
        set(() => ({
            result
        }));
    }
})));