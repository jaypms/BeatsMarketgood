import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Link from 'next/link';

export default function Home() {
  const [beats, setBeats] = useState([]);
  const [filteredStyle, setFilteredStyle] = useState('');

  useEffect(() => {
    const fetchBeats = async () => {
      const beatsSnapshot = await getDocs(collection(db, 'beats'));
      const beatsData = beatsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBeats(beatsData);
    };
    fetchBeats();
  }, []);

  const styles = ['Trap', 'Drill', 'RnB', 'BoomBap', 'Afro', 'Autre'];

  const filteredBeats = filteredStyle
    ? beats.filter(beat => beat.style === filteredStyle)
    : beats;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🎧 Beats disponibles</h1>

      <div className="mb-4">
        <label htmlFor="style-select" className="block mb-2">🎚️ Filtrer par style :</label>
        <select
          id="style-select"
          className="border p-2"
          onChange={(e) => setFilteredStyle(e.target.value)}
          value={filteredStyle}
        >
          <option value="">Tous</option>
          {styles.map(style => (
            <option key={style} value={style}>{style}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filteredBeats.map(beat => (
          <div key={beat.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{beat.title}</h2>
            <p className="text-gray-600">🎵 Style : {beat.style}</p>
            <p className="text-gray-600">💰 {beat.price} €</p>
            <audio controls controlsList="nodownload">
              <source src={beat.audioURL} type="audio/mp3" />
              Votre navigateur ne supporte pas la lecture audio.
            </audio>
            <Link href={`/beatmaker/${beat.userId}`} className="text-blue-500 block mt-2">
              Voir le beatmaker
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
