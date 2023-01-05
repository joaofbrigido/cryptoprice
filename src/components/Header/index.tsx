import { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeContext } from '../../context/ThemeContext';
import S from './styles.module.scss';

export const Header = () => {
  // @ts-ignore: Unreachable code error
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={S.header} data-theme={theme}>
      <div className="mainContainer">
        <Link href="/" className={S.logo}>
          Cp
        </Link>

        <nav className={S.nav}>
          <ul>
            <li>
              <Link href="/">Cotações</Link>
            </li>
            <li>
              <Link href="/preco-medio">Preço Médio</Link>
            </li>
            <li title="Mudar Tema">
              <button className={S.changeTheme} onClick={toggleTheme}>
                <span className={theme === 'light' ? S.active : ''}>
                  <Image
                    src="/icons/lightModeIcon.svg"
                    alt="Ícone de Sol (modo claro)"
                    width={16}
                    height={16}
                  />
                </span>
                <span className={theme === 'dark' ? S.active : ''}>
                  <Image
                    src="/icons/darkModeIcon.svg"
                    alt="Ícone de Lua (modo escuro)"
                    width={16}
                    height={16}
                  />
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
