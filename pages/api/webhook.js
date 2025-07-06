import { buffer } from 'micro';
import Stripe from 'stripe';
import admin from 'firebase-admin';

// Initialise Firebase Admin SDK si pas déjà fait
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false, // Important pour Stripe webhook
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Traiter les événements selon le type
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      // Exemple : récupérer userId depuis metadata
      const userId = session.metadata.userId;

      // Mettre à jour l’abonnement dans Firebase
      try {
        await admin.firestore().collection('users').doc(userId).update({
          subscriptionStatus: 'active',
          subscriptionId: session.subscription,
          currentPlan: session.display_items?.[0]?.price?.id || null,
          lastPaymentDate: new Date(session.created * 1000),
        });
        console.log(`Subscription activated for user ${userId}`);
      } catch (e) {
        console.error('Firebase update error:', e);
      }
      break;

    case 'invoice.payment_failed':
      // Gérer le paiement échoué (par exemple désactiver l’abonnement)
      break;

    case 'customer.subscription.deleted':
      // Gérer l’annulation de l’abonnement
      const subscription = event.data.object;
      const cancelledUserId = subscription.metadata?.userId;
      if (cancelledUserId) {
        try {
          await admin.firestore().collection('users').doc(cancelledUserId).update({
            subscriptionStatus: 'canceled',
          });
          console.log(`Subscription canceled for user ${cancelledUserId}`);
        } catch (e) {
          console.error('Firebase update error:', e);
        }
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
}
