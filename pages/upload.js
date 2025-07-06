import { useEffect, useState } from 'react';
import { auth, db, storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Upload() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [style, setStyle] = useState('trap');
  const router = useRouter();
  const { t } = useTranslation('common');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/connexion');
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleUpload = async () => {
    if (!title || !audioFile || !user) return;

    const storageRef = ref(storage, `beats/${user.uid}/${audioFile.name}`);
    await uploadBytes(storageRef, audioFile);
    const downloadURL = await getDownloadURL(storageRef);

    await addDoc(collection(db, 'beats'), {
      title,
      audioURL: downloadURL,
      userId: user.uid,
      createdAt: serverTimestamp(),
      style,
      isExclusive: false
    });

    router.push('/profil');
  };

  if (!user) return null;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{t('upload')}</h1>

      <input
        type="text"
        placeholder={t('beat_title')}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: '1rem', display: 'block' }}
      />

      <input
        type="file"
        accept="audio/mp3,audio/wav"
        onChange={(e) => setAudioFile(e.target.files[0])}
        style={{ marginBottom: '1rem', display: 'block' }}
      />

      <select value={style} onChange={(e) => setStyle(e.target.value)} style={{ marginBottom: '1rem', display: 'block' }}>
        <option value="trap">{t('style_trap')}</option>
        <option value="drill">{t('style_drill')}</option>
        <option value="rnb">{t('style_rnb')}</option>
        <option value="afro">{t('style_afro')}</option>
      </select>

      <button onClick={handleUpload}>{t('upload')}</button>
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
