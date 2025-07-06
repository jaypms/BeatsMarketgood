import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { useState } from 'react';

export default function Home({ beats }) {
  const { t } = useTranslation('home');
  const [selectedStyle, setSelectedStyle] = useState('all');

  const filteredBeats = selectedStyle === 'all'
    ? beats
    : beats.filter(beat => beat.style === selectedStyle);

  const featuredBeats = beats.filter(b => b.isFeatured);

  const styles = ['all', 'Trap', 'Drill', 'RnB', 'Afro'];

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{t('welcome_title')}</h1>
      <p>{t('welcome_description')}</p>

      {/* Filtres */}
      <div style={{ margin: '1rem 0' }}>
        {styles.map(style => (
          <button
            key={style}
            onClick={() => setSelectedStyle(style)}
            style={{
              marginRight: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: selectedStyle === style ? '#000' : '#ccc',
              color: selectedStyle === style ? '#fff' : '#000',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            {t(`style_${style.toLowerCase()}`)}
          </button>
        ))}
      </div>

      {/* Beats en avant */}
      {featuredBeats.length > 0 && (
        <div>
          <h2>{t('featured_title')}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {featuredBeats.map((beat) => (
              <BeatCard key={beat.id} beat={beat} />
            ))}
          </div>
        </div>
      )}

      {/* Tous les beats */}
      <div style={{ marginTop: '2rem' }}>
        <h2>{t('all_beats_title')}</h2>
        {filteredBeats.length === 0 ? (
          <p>{t('no_beats')}</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {filteredBeats.map((beat) => (
              <BeatCard key={beat.id} beat={beat} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Composant BeatCard
function BeatCard({ beat }) {
  return (
    <div style={{ width: 300, border: '1px solid #ccc', padding: '1rem', borderRadius: '10px' }}>
      <h3>{beat.title}</h3>
      <p>{beat.style}</p>
      <audio controls src={beat.previewURL} style={{ width: '100%' }} />
      <Link href={`/beatmaker/${beat.userId}`} style={{ display: 'block', marginTop: '0.5rem' }}>
        👤 Voir le beatmaker
      </Link>
    </div>
  );
}

// Chargement des beats depuis Firestore
export async function getStaticProps({ locale }) {
  const beatsRef = collection(db, 'beats');
  const q = query(beatsRef, where('isPublic', '==', true));
  const querySnapshot = await getDocs(q);
  const beats = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return {
    props: {
      beats,
      ...(await serverSideTranslations(locale, ['home', 'common']))
    },
    revalidate: 10
  };
}
