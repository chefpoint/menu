import { SWRConfig } from 'swr';
import fetch from '../services/fetch.js';
import Refresh from '../utils/Refresh.js';
import BrowserConfig from '../utils/BrowserConfig';

import '../styles/globals.css';
import '../styles/icons.css';
import '../styles/variables.css';

export default function LunchMenu({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher: fetch, refreshInterval: 10000 }}>
      <Refresh />
      <BrowserConfig />
      <Component {...pageProps} />
    </SWRConfig>
  );
}
