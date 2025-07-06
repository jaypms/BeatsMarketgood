import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Profil() {
  const [user, setUser] = useState(null);
  const [beats, setBeats] = useState([]);
  const router = useRouter();
  const { t } = useTranslation('common');

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push('/connexion');
      } else {
        setUser(currentUser);
        const q = query(collection(db, 'beats'), where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const userBeats = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBeats(userBeats);
      }
    });
  }, []);

  if (!user) return null;

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{t('my_beats')}</h1>
      {beats.length === 0 ? (
        <p>{t('no_beats')}</p>
      ) : (
        <ul>
          {beats.map((beat) => (
            <li key={beat.id}>{beat.title}</li>
          ))}
        </ul>
      )}
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
