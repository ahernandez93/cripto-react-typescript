import { useCryptoStore } from "../store"
import { useMemo } from "react"
import Spinner from "./Spinner";

export default function CryptoPriceDisplay() {
    const result = useCryptoStore((state) => state.result);
    const loading = useCryptoStore((state) => state.loading);
    const hasResult = useMemo(() => !Object.values(result).includes(''), [result]);

    return (
        <div className="result-wrapper">
            {loading ? (
                <Spinner />
            ) : hasResult && (
                <>
                    <h2>Cotización</h2>
                    <div className="result">
                        <img
                            src={`https://cryptocompare.com/${result.IMAGEURL}`}
                            alt="Imagen Cryptomoneda"
                        />
                        <div>
                            <p>El precio es de: <span>{result.PRICE}</span></p>
                            <p>Precio mas alto en el dia: <span>{result.HIGHDAY}</span></p>
                            <p>Precio mas bajo en el dia: <span>{result.LOWDAY}</span></p>
                            <p>Variación ultimas 24 horas: <span>{result.CHANGEPCT24HOUR}</span></p>
                            <p>Ultima actualización: <span>{result.LASTUPDATE}</span></p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
