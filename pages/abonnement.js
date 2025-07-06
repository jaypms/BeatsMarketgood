import { useState } from 'react';

export default function Abonnement() {
  const [lang, setLang] = useState('fr');

  const texts = {
    fr: {
      title: "Page d'abonnement",
      description: "Ici vous pourrez choisir votre formule d’abonnement. Cette page est en version simplifiée pour éviter les erreurs.",
      switchTo: "Switch to English",
    },
    en: {
      title: "Subscription page",
      description: "Here you can choose your subscription plan. This page is simplified to avoid errors.",
      switchTo: "Passer en français",
    },
  };

  const t = texts[lang];

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <button
        onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
        style={{
          marginBottom: 20,
          padding: '8px 16px',
          cursor: 'pointer',
          borderRadius: 5,
          border: '1px solid #1DB954',
          backgroundColor: '#fff',
          color: '#1DB954',
          fontWeight: 'bold',
        }}
      >
        {t.switchTo}
      </button>

      <h1>{t.title}</h1>
      <p>{t.description}</p>
      {/* À compléter plus tard avec Stripe, formulaires, etc. */}
    </div>
  );
}
