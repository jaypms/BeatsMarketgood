import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function SuccessPage() {
  const { t } = useTranslation('common');

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        {t('payment_success_title')}
      </h1>
      <p style={{ fontSize: '1.2rem' }}>{t('payment_success_message')}</p>
      <p style={{ marginTop: '1rem' }}>{t('payment_success_redirect')}</p>
      <Link href="/profil">
        <button
          style={{
            marginTop: '2rem',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            borderRadius: '8px',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {t('go_to_profile')}
        </button>
      </Link>
    </div>
  );
}

// Cette fonction permet de charger les traductions au moment du rendu
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
