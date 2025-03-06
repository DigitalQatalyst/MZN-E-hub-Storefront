'use client'

import React, { useState, useEffect } from 'react';
import Grid from "@component/grid/Grid";
import Container from "@component/Container";
import StripeCheckoutForm from "@sections/checkout/stripecheckoutForm";
import CheckoutForm2 from "@sections/checkout/CheckoutForm2";
import CheckoutSummary2 from "@sections/checkout/CheckoutSummary2";

// NECESSARY LIBRARIES
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Ensure Stripe's publishable key is available
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutAlternativeProps {
  orderCode: string;
}

export default function CheckoutAlternative({ orderCode }: CheckoutAlternativeProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Fetch the client secret from your API when the component mounts
  useEffect(() => {
    const fetchClientSecret = async () => {
      const res = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 5000, // Example amount (in cents), change as per your logic
          orderId: orderCode,
        }),
      });

      const data = await res.json();

      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        console.error("Error fetching client secret");
      }
    };

    fetchClientSecret();
  }, [orderCode]);

  // Wait until clientSecret is fetched before rendering the Stripe form
  if (!clientSecret) {
    return <div>Loading...</div>; // Show loading spinner or message while fetching the clientSecret
  }

  return (
    <Container my="1.5rem">
      <Grid container spacing={6}>
        {/* Checkout Form Section */}
        <Grid item lg={8} md={8} xs={12}>
          <CheckoutForm2 />
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <StripeCheckoutForm clientSecret={clientSecret} orderCode={orderCode} />
          </Elements>
        </Grid>

        {/* Checkout Summary Section */}
        <Grid item lg={4} md={4} xs={12}>
          <CheckoutSummary2 />
        </Grid>
      </Grid>
    </Container>
  );
}
