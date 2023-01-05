import Link from 'next/link';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import S from './styles.module.scss';

export const Footer = () => {
  // @ts-ignore: Unreachable code error
  const { theme } = useContext(ThemeContext);

  return (
    <footer className={S.footer} data-theme={theme}>
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
