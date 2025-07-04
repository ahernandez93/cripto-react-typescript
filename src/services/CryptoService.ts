import axios from "axios";
import { CryptoCurrenciesResponseSchema, CryptoPriceSchema } from "../schema/crypto-schema";
import { Pair } from "../types";

export async function getCryptos() {
    // const url = 'https://data-api.coindesk.com/asset/v1/top/list?page_size=10&sort_by=CIRCULATING_MKT_CAP_USD&sort_direction=DESC&groups=ID,BASIC&toplist_quote_asset=USD&api_key=9d429a2daace7f7625c2dcb8ae6e60d20ad2416fd5a63ec92f1c027eabe2afb3';
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
    const { data: { Data } } = await axios.get(url);
    const result = CryptoCurrenciesResponseSchema.safeParse(Data);
    if (result.success) {
        return result.data;
    }
}

export async function fetchCurrentCryptoPrice(pair: Pair) {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.criptocurrency}&tsyms=${pair.currency}`;
    const { data: { DISPLAY } } = await axios.get(url);
    const result = CryptoPriceSchema.safeParse(DISPLAY[pair.criptocurrency][pair.currency]);
    if (result.success) {
        return result.data;
    }
}
