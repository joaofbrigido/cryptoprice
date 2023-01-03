import Link from 'next/link';
import S from './styles.module.scss';

export const Footer = () => {
  return (
    <footer className={S.footer}>
      <p>
        Dados Fornecidos por{' '}
        <Link href="https://www.coingecko.com/" target="_blank">
          CoinGecko
        </Link>
        &#169; App feito por{' '}
        <Link href="https://joaofbrigido.github.io" target="_blank">
          João Fernando
        </Link>
      </p>
    </footer>
  );
};
