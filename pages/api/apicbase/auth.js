import { withAuth } from '@clerk/nextjs/api';
import clerk from '../../../services/clerk';

export default withAuth(async (req, res) => {
  //
  // FIRST
  // Ask Apicbase API if access_token is valid
  // If the token is still valid, send the set back to the client
  const tokenIsValid = await introspect(req.body.access_token);
  if (tokenIsValid) return res.status(200).send(req.body);

  // SECOND
  // If the token is NOT valid, try to refresh it
  // and send the new set back to the client
  const newSetOfTokens = await refresh(req.body.refresh_token);
  if (!('error' in newSetOfTokens)) return res.status(200).send(newSetOfTokens);

  // THIRD
  // If the token is STILL NOT valid, get a new token from the auth_code
  // that is stored in Clerk->UserId->private_metadata->apicbase_auth_code
  const { userId } = req.auth;
  const { apicbase_auth_code } = await clerk(userId, 'private_metadata');
  const firstSetOfTokens = await getFirstSetOfTokens(apicbase_auth_code);
  console.log(firstSetOfTokens);
  if (firstSetOfTokens != null) return res.status(200).send(firstSetOfTokens);

  // FOURTH
  // If nothing above worked, then the user must re-authenticate with Apicbase again
  // Return with 401 Unauthorized
  return res.status(401).send('All authentication methods failed. User must reauthorize with Apicbase.');
  //
});

async function getFirstSetOfTokens(auth_code) {
  //
  // Refresh the tokens?
  let firstSetOfTokens;
  //
  // FIRST
  // Get a new token from the API
  await fetch('https://app.apicbase.com/oauth/token/', {
    method: 'POST',
    headers: { 'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: auth_code,
      client_id: process.env.NEXT_PUBLIC_APICBASE_CLIENT_ID,
      client_secret: process.env.APICBASE_CLIENT_SECRET,
    }),
  })
    .then((response) => response.json())
    .then((data) => (firstSetOfTokens = data));

  return firstSetOfTokens;
}

async function refresh(refresh_token) {
  //
  // Refresh the tokens?
  let newSetOfTokens;
  //
  // FIRST
  // Get a new token from the API
  await fetch('https://app.apicbase.com/oauth/token/', {
    method: 'POST',
    headers: { 'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
      client_id: process.env.NEXT_PUBLIC_APICBASE_CLIENT_ID,
      client_secret: process.env.APICBASE_CLIENT_SECRET,
    }),
  })
    .then((response) => response.json())
    .then((data) => (newSetOfTokens = data));

  return newSetOfTokens;

  // {
  //   access_token: 'N0wewJYnc9wKQlquCcONgxREncNAKv',
  //   expires_in: 604800,
  //   token_type: 'Bearer',
  //   scope: 'library',
  //   refresh_token: 'KjYSw3Wzqvnmatmz5KahcoWLzVKbg7'
  // }
}

async function introspect(token) {
  //
  // Is the token still active?
  let tokenValidity;

  // Ask Apicbase API to introspect the token
  await fetch('https://app.apicbase.com/oauth/introspect/', {
    method: 'POST',
    headers: { 'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    body: new URLSearchParams({
      token: token,
      client_id: process.env.NEXT_PUBLIC_APICBASE_CLIENT_ID,
      client_secret: process.env.APICBASE_CLIENT_SECRET,
    }),
  })
    .then((response) => response.json())
    .then((tokenInfo) => (tokenValidity = tokenInfo.active));

  // Return result to the caller
  return tokenValidity;
}
