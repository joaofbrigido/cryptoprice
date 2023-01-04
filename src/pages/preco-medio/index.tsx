import { useState } from 'react';
import Image from 'next/image';
import S from './styles.module.scss';

// https://api.coingecko.com/api/v3/coins/bitcoin/history?date=05-12-2022&localization=false

type CryptoResponse = {
  id: string;
  name: string;
  symbol: string;
  image: {
    small: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
  };
  error: string;
};

type Crypto = {
  id: string;
  slug: number;
  name: string;
  symbol: string;
  image: string;
  quantity: number;
  price: number;
  date: string;
};

const PrecoMedio = () => {
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [coin, Setcoin] = useState('');
  const [cryptoList, setCryptoList] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(false);
  const [slug, setSlug] = useState(0);

  async function handleAddCrypto() {
    if (date === '' || quantity <= 0 || coin === '-1' || coin === '') {
      alert('Necessário preencher os campos corretamente');
    } else {
      try {
        setLoading(true);
        const dateTime = new Date(date);
        const formatDate =
          dateTime.getDate() +
          '-' +
          (dateTime.getMonth() + 1) +
          '-' +
          dateTime.getFullYear();

        if (dateTime > new Date() || dateTime < new Date('12-31-2015')) {
          alert('Data Inválida');
        } else {
          const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${coin}/history?date=${formatDate}&localization=false`
          );
          const crypto: CryptoResponse = await response.json();
          setSlug(slug + 1);

          if (response.ok) {
            const newRow = {
              id: crypto.id,
              slug: slug,
              name: crypto.name,
              symbol: crypto.symbol,
              image: crypto.image.small,
              quantity: quantity,
              price: crypto.market_data.current_price.usd,
              date: date,
            };

            setCryptoList([...cryptoList, newRow]);
          } else {
            alert(crypto.error);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }

  function handleDeleteRow(slug: number) {
    const updateList = cryptoList.filter((item) => item.slug !== slug);
    setCryptoList(updateList);
  }

  return (
    <main className={`mainContainer ${S.main}`}>
      <section className={S.inputsContainer}>
        <div className={S.inputWrapp}>
          <label htmlFor="date">Dia da Compra</label>
          <input
            type="date"
            id="date"
            className={S.input}
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div className={S.inputWrapp}>
          <label htmlFor="qtd">Quantidade</label>
          <input
            type="number"
            id="qtd"
            className={S.input}
            value={quantity}
            onChange={({ target }) => setQuantity(Number(target.value))}
          />
        </div>
        <div className={S.inputWrapp}>
          <label htmlFor="crypto">Criptomoeda</label>
          <select
            id="crypto"
            className={S.input}
            value={coin}
            onChange={({ target }) => Setcoin(target.value)}
          >
            <option value="-1">Escolha uma Moeda</option>
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
          </select>
        </div>

        <button className={S.btn} onClick={handleAddCrypto} disabled={loading}>
          {loading ? 'Adicionando...' : 'Adicionar'}
        </button>
      </section>

      <div
        className="tableContainer"
        style={{ height: 'calc(60vh)', marginTop: '52px' }}
      >
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Moeda</th>
              <th>Quantidade</th>
              <th>Preço (USD)</th>
              <th>Data</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {!!cryptoList.length &&
              cryptoList.map((crypto, idx) => (
                <tr key={`${crypto.id}-${idx}`}>
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
                  <td>{crypto.quantity}</td>
                  <td>${crypto.price.toFixed(2)}</td>
                  <td>
                    {new Date(crypto.date).toLocaleDateString('pt-BR', {
                      timeZone: 'UTC',
                    })}
                  </td>
                  <td className={S.deleteRow}>
                    <span onClick={() => handleDeleteRow(crypto.slug)}>x</span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <button className={S.btn} style={{ marginTop: '32px' }}>
        Calcular
      </button>

      <p className={S.averagePrice}>Preço Médio: $1231</p>
    </main>
  );
};

export default PrecoMedio;