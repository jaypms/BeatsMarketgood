import '@/styles/globals.css'; // adapte ce chemin selon ton projet
import LanguageSwitcher from '@/components/LanguageSwitcher';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <LanguageSwitcher />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
