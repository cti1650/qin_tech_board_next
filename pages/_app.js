import 'tailwindcss/tailwind.css';
import * as gtag from '@lib/gtag';
import usePageView from '../src/hooks/usePageView';

function MyApp({ Component, pageProps }) {
  usePageView();
  return <Component {...pageProps} />;
}

export default MyApp;
