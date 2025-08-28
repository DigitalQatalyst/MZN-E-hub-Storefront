// app/auth/callback/page.tsx
'use client';
import { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { useRouter } from 'next/navigation';

export default function Callback() {
  const { instance, accounts } = useMsal();
  const router = useRouter();

  useEffect(() => {
    instance.handleRedirectPromise()
      .then(() => {
        const acc = instance.getActiveAccount() ?? accounts[0];
        if (acc) instance.setActiveAccount(acc);
        router.replace('/dashboard');
      })
      .catch(() => router.replace('/dashboard'));
  }, [instance, accounts, router]);

  return <p>Signing you in…</p>;
}
