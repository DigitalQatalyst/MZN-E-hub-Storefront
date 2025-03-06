'use client'

import React, { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

interface StripeCheckoutFormProps {
  clientSecret: string;
  orderCode: string;
}

const StripeCheckoutForm: React.FC<StripeCheckoutFormProps> = ({ clientSecret, orderCode }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded
      return;
    }

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/confirmation/${orderCode}`, // Redirect to confirmation page after payment
      },
    });

    if (error) {
      console.error('Error during payment confirmation:', error.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={loading || !stripe}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default StripeCheckoutForm;