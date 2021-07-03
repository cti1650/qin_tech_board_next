import 'tailwindcss/tailwind.css';
import AuthBasic from '../src/components/tools/supabase';

function MyApp({ Component, pageProps }) {
  return (
    <AuthBasic>
      <Component {...pageProps} />
    </AuthBasic>
  );
}

export default MyApp;
