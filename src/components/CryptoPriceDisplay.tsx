import { useCryptoStore } from "../store"
import { useMemo } from "react"

export default function CryptoPriceDisplay() {
    const result = useCryptoStore((state) => state.result);
    const hasResult = useMemo(() => !Object.values(result).includes(''), [result]);

    return (
        <div>
            {hasResult && (
                <>
                    <h2>Cotización</h2>
                    <div className="result">
                        <div>
                            <p>El precio es de: <span>{result.PRICE}</span></p>
                            <p>El precio mas alto en el dia: <span>{result.HIGHDAY}</span></p>
                            <p>El precio mas bajo en el dia: <span>{result.LOWDAY}</span></p>
                            <p>El cambio en el dia: <span>{result.CHANGEPCT24HOUR}</span></p>
                            <p>Ultima actualizacion: <span>{result.LASTUPDATE}</span></p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
