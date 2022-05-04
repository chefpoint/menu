// // CONSTANTS
// const APICBASE_API_BASE_URL = 'https://app.apicbase.com/api/v1/';

// export async function apicbaseAPI(endpoint, method, body) {
//   //
//   // FIRST
//   // Get Apicbase authentication token from localStorage
//   let token;
//   if (typeof window !== 'undefined') token = localStorage.getItem('apicbase_token');

//   // try request with this token

//   // if it fails, get a new token from refresh

//   // SECOND
//   // Setup the request
//   const url = APICBASE_API_BASE_URL + endpoint;
//   const options = {
//     method: method,
//     headers: {
//       Authorization: 'Bearer ' + auth.token,
//       'Content-Type': 'application/json',
//     },
//     body: body ? JSON.stringify(body) : null,
//   };

//   await fetch('https://app.apicbase.com/api/v1/' + endpoint, {
//     method: method,
//     headers: {
//       Authorization: 'Bearer ' + process.env.CLERK_API_KEY,
//       'Content-Type': 'application/json',
//     },
//     body: new URLSearchParams({
//       grant_type: 'authorization_code',
//       code: authCode,
//       client_id: process.env.NEXT_PUBLIC_APICBASE_CLIENT_ID,
//       client_secret: process.env.APICBASE_CLIENT_SECRET,
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log('-----------------YESSSS');
//       console.log(data);
//     })
//     .catch((err) => {
//       console.log('-----------------NOOOOOOO');
//       console.log(err);
//     });
// }

// export async function getToken() {
//   //
//   // FIRST
//   // Get short-lived token from localStorage
//   let token;
//   if (typeof window !== 'undefined') {
//     token = localStorage.getItem('apicbase_token');
//   }

//   //
//   // Check validity of token
//   await fetch('/api/apicbase/token', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ token }),
//   })
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   //
//   // If valid, return the token and continue with the request
//   //
//   // If invalid, get refresh_token from local storage and return this new token
//   //
//   // If refresh token is invalid, ask a new set of token with the auth_code from clerk
//   //
// }

// async function isTokenValid(token) {
//   await fetch('https://app.apicbase.com/oauth/introspect/', {
//     method: 'POST',
//     headers: { 'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8' },
//     body: new URLSearchParams({
//       token: token,
//       client_id: process.env.NEXT_PUBLIC_APICBASE_CLIENT_ID,
//       client_secret: process.env.APICBASE_CLIENT_SECRET,
//     }),
//   })
//     .then((response) => response.json())
//     .then(({ active }) => {
//       if (active) return true;
//       return false;
//     });
// }

// export async function getFirstToken(authCode) {
//   await fetch('https://app.apicbase.com/oauth/token/', {
//     method: 'POST',
//     headers: { 'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8' },
//     body: new URLSearchParams({
//       grant_type: 'authorization_code',
//       code: authCode,
//       client_id: process.env.NEXT_PUBLIC_APICBASE_CLIENT_ID,
//       client_secret: process.env.APICBASE_CLIENT_SECRET,
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log('-----------------YESSSS');
//       console.log(data);
//     })
//     .catch((err) => {
//       console.log('-----------------NOOOOOOO');
//       console.log(err);
//     });
// }

// //
// //
// //
// //
// //
// //
// // IDEAL API USAGE
// //
// // const response = apicbase
// //     .fetch('https://app.apicbase.com/api/v1/products/recipes/', {
// //       method: 'GET',
// //       redirect: 'follow',
// //     })
// //     .then((response) => response.text())
// //     .then((result) => console.log(result))
// //     .catch((error) => console.log('error', error));
