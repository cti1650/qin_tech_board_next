import Head from 'next/head';
import Layout from '../src/components/layout';
import ScrollPageTop from '../src/components/tools/ScrollPageTop';
import GoogleForm from '../src/components/tools/GoogleForm';
import MkletButton from '../src/components/button/MkletButton';

export default function Form() {
  return (
    <Layout>
      <Head>
        <title>QinTechBoard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MkletButton />
      <GoogleForm />
      <ScrollPageTop></ScrollPageTop>
    </Layout>
  );
}
