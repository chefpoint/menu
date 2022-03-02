import '../styles/globals.css';
import '../styles/icons.css';
import { SWRConfig } from 'swr';
import fetch from '../services/fetch.js';
import BrowserConfig from '../utils/BrowserConfig';
import Refresh from '../utils/Refresh.js';

export default function LunchMenu({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher: fetch, refreshInterval: 10000 }}>
      <Refresh />
      <BrowserConfig />
      <Component {...pageProps} />
    </SWRConfig>
  );
}
