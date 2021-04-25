import Head from 'next/head';
import Layout from '../src/components/layout';
import ScrollPageTop from '../src/components/tools/ScrollPageTop';
import GoogleForm from '../src/components/tools/GoogleForm';
import ListTitle from '../src/components/title/ListTitle';

export default function Form() {
  return (
    <Layout>
      <Head>
        <title>QinTechBoard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ListTitle title='受付フォーム' />
      <GoogleForm />
      <ScrollPageTop></ScrollPageTop>
    </Layout>
  );
}
