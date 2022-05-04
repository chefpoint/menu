import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';

export default function AuthCallback() {
  //
  const { query } = useRouter();

  const { user } = useUser();

  useEffect(() => {
    fetch('/api/apicbase/saveAuthCode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apicbaseAuthCode: query.code }),
    })
      .then((response) => {
        console.log(response);
        window.location = '/edit';
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      <header>
        <UserButton />
      </header>
      <div style={{ color: 'white' }}>{query.code}</div>
      <div style={{ color: 'white' }}>{user.id}</div>
    </>
  );
}
