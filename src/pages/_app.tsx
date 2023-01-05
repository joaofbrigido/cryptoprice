import type { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import NextNprogress from 'nextjs-progressbar';
import { ToastContainer } from 'react-toastify';
import '../styles/globals.scss';
import { ThemeProvider } from '../context/ThemeContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNprogress
        color="#6756f5"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <ThemeProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
}
