import { SWRConfig } from 'swr';
import fetch from '../services/fetch.js';
import Refresh from '../utils/Refresh.js';
import BrowserConfig from '../utils/BrowserConfig';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { MantineProvider } from '@mantine/core';

import '../styles/globals.css';
import '../styles/icons.css';
import '../styles/variables.css';

const publicPages = ['/', '/tv'];

export default function Menu({ Component, pageProps }) {
  //
  // Get the pathname
  const { pathname } = useRouter();

  // Check if the current route matches a public page
  const isPublicPage = publicPages.includes(pathname);

  return (
    <ClerkProvider {...pageProps}>
      <SWRConfig value={{ fetcher: fetch /*refreshInterval: 10000*/ }}>
        {/* <MantineProvider> */}
        <Refresh />
        <BrowserConfig />
        {isPublicPage ? (
          <Component {...pageProps} />
        ) : (
          <>
            <SignedIn>
              <Component {...pageProps} />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        )}
        {/* </MantineProvider> */}
      </SWRConfig>
    </ClerkProvider>
  );
}
