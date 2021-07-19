import Head from 'next/head';
import Layout from '@comp/layout';
import ScrollPageTop from '@comp/tools/ScrollPageTop';
import GoogleForm from '@comp/tools/GoogleForm';
import { SupaUIForm } from '@comp/tools/SupaUIForm';
import { TagCheckList } from '@comp/tag/TagCheckList';
import MkletButton from '@comp/button/MkletButton';
import { TagSelecter } from '@comp/tag/TagSelecter';

export default function Form() {
  return (
    <Layout>
      <Head>
        <title>QinTechBoard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <TagCheckList />
      <ScrollPageTop></ScrollPageTop>
    </Layout>
  );
}
