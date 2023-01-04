import type { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import NextNprogress from 'nextjs-progressbar';
import '../styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNprogress
        color="#6756f5"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />

      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
