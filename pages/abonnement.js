import { useState } from 'react';

export default function Abonnement() {
  const [lang, setLang] = useState('fr');
  const [loading, setLoading] = useState(false);

  // Price IDs Stripe déjà configurés (met à jour si besoin)
  const priceIds = {
    free: 'price_1RgQDx4GW3uce1xsbEtYnmwM',      // Pro (10€/mois HT => 12€ TTC approx)
    pro: 'price_1RgQEv4GW3uce1xs8qT8wf56',       // Illimité (20€/mois HT => 24€ TTC approx)
    diamant: 'price_1RgQEv4GW3uce1xs8qT8wf56',   // Je mets le même que Illimité (à changer si besoin)
  };

  const texts = {
    fr: {
      title: "Page d'abonnement",
      description: "Choisissez votre formule et payez votre abonnement.",
      switchTo: "Switch to English",
      plans: [
        { id: priceIds.free, name: "Gratuit", price: "0 € TTC / mois" },
        { id: priceIds.pro, name: "Pro", price: "12 € TTC / mois" },
        { id: priceIds.diamant, name: "Diamant", price: "24 € TTC / mois" },
      ],
      button: "S'abonner",
      error: "Erreur, réessayez.",
    },
    en: {
      title: "Subscription page",
      description: "Choose your plan and pay your subscription.",
      switchTo: "Passer en français",
      plans: [
        { id: priceIds.free, name: "Free", price: "€0 TTC / month" },
        { id: priceIds.pro, name: "Pro", price: "€12 TTC / month" },
        { id: priceIds.diamant, name: "Diamond", price: "€24 TTC / month" },
      ],
      button: "Subscribe",
      error: "Error, please try again.",
    },
  };

  const t = texts[lang];
  const [selectedPlan, setSelectedPlan] = useState(t.plans[0].id);

  async function handleSubscribe() {
    setLoading(true);
    try {
      const priceId = selectedPlan;

      // TODO : récupère ici le userId Firebase connecté (remplace cette valeur)
      const userId = "firebase-user-id-placeholder";

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, userId }),
      });
      const data = await response.json();

      if (data.sessionId) {
        const stripe = await import('@stripe/stripe-js').then(m => m.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY));
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
      } else {
        alert(t.error);
      }
    } catch (err) {
      console.error(err);
      alert(t.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <button
        onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
        style={{ marginBottom: 20, padding: '8px 16px', cursor: 'pointer', borderRadius: 5, border: '1px solid #1DB954', backgroundColor: '#fff', color: '#1DB954', fontWeight: 'bold' }}
      >
        {t.switchTo}
      </button>

      <h1>{t.title}</h1>
      <p>{t.description}</p>

      <div>
        {t.plans.map(plan => (
          <label key={plan.id} style={{ display: 'block', margin: '15px 0', cursor: 'pointer' }}>
            <input
              type="radio"
              name="plan"
              value={plan.id}
              checked={selectedPlan === plan.id}
              onChange={() => setSelectedPlan(plan.id)}
              style={{ marginRight: 10 }}
            />
            <strong>{plan
