import { useRouter } from 'next/router';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale, asPath } = router;

  const otherLocale = locale === 'fr' ? 'en' : 'fr';

  const changeLanguage = () => {
    router.push(asPath, asPath, { locale: otherLocale });
  };

  return (
    <button
      onClick={changeLanguage}
      style={{
        position: 'fixed',
        top: 10,
        right: 10,
        padding: '6px 12px',
        fontSize: '14px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        background: '#f9f9f9',
        cursor: 'pointer',
        zIndex: 1000
      }}
    >
      {otherLocale.toUpperCase()}
    </button>
  );
}
