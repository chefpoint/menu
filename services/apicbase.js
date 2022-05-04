import lstore from '../utils/lstore';

// CONSTANTS
const APICBASE_API_BASE_URL = 'https://app.apicbase.com/api/v1';

export async function apicbaseAPI(endpoint, method, body) {
  //
  // FIRST
  // Get Apicbase authentication object from lstore
  let apicbase_auth = await lstore.get('apicbase_auth');

  // SECOND
  // Check if token is still valid or get a new one
  await fetch('/api/apicbase/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(apicbase_auth),
  })
    .then((response) => response.json())
    .then((data) => {
      if (apicbase_auth.access_token != data.access_token) {
        apicbase_auth = data;
        lstore.set('apicbase_auth', data);
      }
    })
    .catch((err) => {
      // If nothing worked user must reauthenticate with apicbase
    });

  // THIRD
  // Setup the request to Apicbase API
  let result;
  await fetch(APICBASE_API_BASE_URL + endpoint, {
    method: method,
    headers: {
      Authorization: 'Bearer ' + apicbase_auth.access_token,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  })
    .then((response) => response.json())
    .then((data) => (result = data))
    .catch((err) => {
      console.log('-----------------NOOOOOOO');
      console.log(err);
    });

  return result;
}
