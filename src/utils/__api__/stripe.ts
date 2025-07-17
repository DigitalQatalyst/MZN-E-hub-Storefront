import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';

// Initialize Stripe with the secret key and API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-02-24.acacia' });

// Define the structure of the body to type it properly
interface PaymentRequestBody {
  amount: number;
  orderId: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { amount, orderId } = req.body as PaymentRequestBody;

      // Create a PaymentIntent
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        metadata: { order_id: orderId }, // Add any other metadata if needed
      });

      // Return the client secret
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      // Handle any errors that occur during the payment intent creation
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    // If the method is not POST, return Method Not Allowed
    res.status(405).end(); // Method Not Allowed
  }
}
