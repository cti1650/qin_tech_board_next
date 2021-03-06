import Head from 'next/head';
import Layout from '@comp/layout';
import ScrollPageTop from '@comp/tools/ScrollPageTop';
import GoogleForm from '@comp/tools/GoogleForm';
import { SupaUIForm } from '@comp/tools/SupaUIForm';
import MkletButton from '@comp/button/MkletButton';

export default function Form() {
  return (
    <Layout>
      <Head>
        <title>QinTechBoard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MkletButton />
      <SupaUIForm />
      <ScrollPageTop></ScrollPageTop>
    </Layout>
  );
}
