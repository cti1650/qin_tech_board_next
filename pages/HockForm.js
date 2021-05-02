import Head from 'next/head';
import Layout from '../src/components/layout';
import ScrollPageTop from '../src/components/tools/ScrollPageTop';
import { HockForm } from '../src/components/form/HockForm';
import MkletButton from '../src/components/button/MkletButton';

export default function Form() {
  return (
    <Layout>
      <Head>
        <title>QinTechBoard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MkletButton />
      <HockForm />
      <ScrollPageTop></ScrollPageTop>
    </Layout>
  );
}
