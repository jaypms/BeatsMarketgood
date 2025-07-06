import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Abonnement() {
  const { t } = useTranslation('common');

  const plans = [
    {
      id: 'free',
      title: t('plan_free_title'),
      price: t('plan_free_price'),
      features: [
        t('plan_free_feature1'),
        t('plan_free_feature2'),
        t('plan_free_feature3')
      ]
    },
    {
      id: 'pro',
      title: t('plan_pro_title'),
      price: t('plan_pro_price'),
      features: [
        t('plan_pro_feature1'),
        t('plan_pro_feature2'),
        t('plan_pro_feature3')
      ]
    },
    {
      id: 'diamond',
      title: t('plan_diamond_title'),
      price: t('plan_diamond_price'),
      features: [
        t('plan_diamond_feature1'),
        t('plan_diamond_feature2'),
        t('plan_diamond_feature3')
      ]
    }
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{t('subscription')}</h1>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {plans.map((plan) => (
          <div
            key={plan.id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              borderRadius: '8px',
              width: '300px'
            }}
          >
            <h2>{plan.title}</h2>
            <p>{plan.price}</p>
            <ul>
              {plan.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <button>{t('subscribe')}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  };
}
