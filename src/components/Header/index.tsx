import Image from 'next/image';
import Link from 'next/link';
import S from './styles.module.scss';

export const Header = () => {
  return (
    <header className={S.header}>
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
            {/* <li>
              <Link href="#" className={S.changeMode}>
                <Image
                  src="/icons/lightModeIcon.svg"
                  alt="Ícone de Sol (modo claro)"
                  width={24}
                  height={24}
                />
                Light Mode
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
};
