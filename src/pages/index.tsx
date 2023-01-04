import { useMemo, useState } from 'react';
import Image from 'next/image';
import S from '../styles/Home.module.scss';

type cryptosProp = {
  cryptos: [
    {
      id: string;
      name: string;
      symbol: string;
      image: string;
      current_price: number;
      price_change_percentage_24h: number;
    }
  ];
};

export default function Home({ cryptos }: cryptosProp) {
  const [search, setSearch] = useState('');

  const cryptosFiltered = useMemo(() => {
    const lowerSearch = search.toLocaleLowerCase().trim();
    return cryptos.filter((crypto) =>
      crypto.name.toLocaleLowerCase().includes(lowerSearch)
    );
  }, [cryptos, search]);

  return (
    <>
      <main className={`mainContainer ${S.main}`}>
        <div className={S.searchWrapp}>
          <input
            type="text"
            placeholder="Buscar Criptomoeda..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span>
            <Image
              src="/icons/searchIcon.svg"
              alt="Ícone de Busca (Lupa)"
              width={16}
              height={16}
            />
          </span>
        </div>

        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Moeda</th>
                <th>Preço (USD)</th>
                <th>Variação (24h)</th>
              </tr>
            </thead>

            <tbody>
              {!!cryptosFiltered &&
                cryptosFiltered.map((crypto, idx) => (
                  <tr key={crypto.id}>
                    <td>{idx + 1}</td>
                    <td className="coin">
                      <span className="imgCrypto">
                        <Image
                          src={crypto.image}
                          alt={crypto.name}
                          width={36}
                          height={36}
                        />
                      </span>
                      <div className="coinText">
                        <p>{crypto.name}</p>
                        <span>{crypto.symbol}</span>
                      </div>
                    </td>
                    <td>${crypto.current_price.toFixed(2)}</td>
                    <td
                      className={
                        crypto.price_change_percentage_24h > 1
                          ? 'percentGreen'
                          : 'percentRed'
                      }
                    >
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
  );
  const cryptos = await res.json();

  return {
    props: {
      cryptos,
    },
    revalidate: 60 * 30, // 30 min
  };
}
