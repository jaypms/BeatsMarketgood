import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [lang, setLang] = useState('fr');
  const router = useRouter();

  const t = {
    fr: {
      welcome: "Bienvenue sur BeatsMarket",
      chooseProfile: "Choisissez votre profil pour commencer :",
      beatmaker: "Je suis BeatMaker",
      buyer: "Je veux acheter des instrus",
      featured: "Beatmakers mis en avant",
      listenBeats: "Écoutez quelques instrus sélectionnées",
      noContent: "Aucun contenu disponible pour le moment.",
      footer: "© 2025 BeatsMarket - Tous droits réservés",
      cgv: "Conditions Générales de Vente",
      contact: "Contactez-nous",
    },
    en: {
      welcome: "Welcome to BeatsMarket",
      chooseProfile: "Choose your profile to get started:",
      beatmaker: "I am a BeatMaker",
      buyer: "I want to buy beats",
      featured: "Featured Beatmakers",
      listenBeats: "Listen to some selected beats",
      noContent: "No content available at the moment.",
      footer: "© 2025 BeatsMarket - All rights reserved",
      cgv: "Terms and Conditions of Sale",
      contact: "Contact us",
    },
  };

  const txt = t[lang];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* HEADER */}
      <header style={{ padding: 20, borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 'bold', fontSize: 26, color: '#1DB954', cursor: 'pointer' }} onClick={() => router.push('/')}>
          BeatsMarket
        </div>
        <div>
          <button
            onClick={() => setLang('fr')}
            disabled={lang === 'fr'}
            style={{
              marginRight: 8,
              padding: '6px 12px',
              backgroundColor: lang === 'fr' ? '#1DB954' : '#eee',
              color: lang === 'fr' ? '#fff' : '#333',
              border: 'none',
              borderRadius: 5,
              cursor: lang === 'fr' ? 'default' : 'pointer',
            }}
          >
            FR
          </button>
          <button
            onClick={() => setLang('en')}
            disabled={lang === 'en'}
            style={{
              padding: '6px 12px',
              backgroundColor: lang === 'en' ? '#1DB954' : '#eee',
              color: lang === 'en' ? '#fff' : '#333',
              border: 'none',
              borderRadius: 5,
              cursor: lang === 'en' ? 'default' : 'pointer',
            }}
          >
            EN
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main style={{ flexGrow: 1, maxWidth: 900, margin: '30px auto', padding: '0 20px', textAlign: 'center' }}>
        <h1>{txt.welcome}</h1>
        <p style={{ fontSize: 20, marginBottom: 40 }}>{txt.chooseProfile}</p>

        {/* Choix profil */}
        <div style={{ marginBottom: 50 }}>
          <button
            onClick={() => router.push('/signup/beatmaker')}
            style={{
              padding: '15px 50px',
              margin: '0 20px',
              fontSize: 18,
              borderRadius: 8,
              border: 'none',
              backgroundColor: '#1DB954',
              color: 'white',
              cursor: 'pointer',
              minWidth: 180,
            }}
          >
            {txt.beatmaker}
          </button>

          <button
            onClick={() => router.push('/signup/buyer')}
            style={{
              padding: '15px 50px',
              margin: '0 20px',
              fontSize: 18,
              borderRadius: 8,
              border: 'none',
              backgroundColor: '#333',
              color: 'white',
              cursor: 'pointer',
              minWidth: 180,
            }}
          >
            {txt.buyer}
          </button>
        </div>

        {/* Beats en écoute - section vide prête à être remplie */}
        <section style={{ marginBottom: 60 }}>
          <h2>{txt.listenBeats}</h2>
          {/* Ici, plus tard tu affiches la liste des beats avec lecteur audio */}
          <p style={{ color: '#999', fontStyle: 'italic' }}>{txt.noContent}</p>
        </section>

        {/* Beatmakers mis en avant - section vide prête à être remplie */}
        <section style={{ marginBottom: 60 }}>
          <h2>{txt.featured}</h2>
          {/* Ici, plus tard tu affiches les beatmakers mis en avant */}
          <p style={{ color: '#999', fontStyle: 'italic' }}>{txt.noContent}</p>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: '1px solid #ddd',
          padding: '20px 10px',
          textAlign: 'center',
          color: '#777',
          fontSize: 14,
        }}
      >
        <div>{txt.footer}</div>
        <div>
          <a href="/cgv" target="_blank" rel="noopener noreferrer" style={{ color: '#1DB954', textDecoration: 'none' }}>
            {txt.cgv}
          </a>{' '}
          |{' '}
          <a href="/contact" style={{ color: '#1DB954', textDecoration: 'none' }}>
            {txt.contact}
          </a>
        </div>
      </footer>
    </div>
  );
}
