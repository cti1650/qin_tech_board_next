import Head from 'next/head';
import useSWR from 'swr';
import { useState } from 'react';
import Layout from '../src/components/layout';
import LinkButtons from '../src/components/button/LinkButtons';
import ScrollPageTop from '../src/components/tools/ScrollPageTop';

export default function Home() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    'https://script.google.com/macros/s/AKfycbzdElyGY3H5HYcoUKOxOG9-F7LpmwlPe2y13jZv3lskhajjF20A4KiZNT7e6EoMvF2aOQ/exec',
    fetcher,
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );
  const [keyword, setKeyword] = useState('');
  function doSearch(e) {
    setKeyword(e.target.value);
  }
  return (
    <Layout>
      <Head>
        <title>QinTechBoard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='w-full px-4 py-4 mt-4 sticky top-0 bg-black'>
        <input
          type='search'
          className='w-full bg-black focus:bg-gray-900 outline-none rounded-full border border-gray-800 px-4 py-1 text-white'
          placeholder='検索'
          value={keyword}
          onChange={(e) => doSearch(e)}
        ></input>
      </div>
      <LinkButtons
        title='ツール＆サービス'
        items={data && (data['data']['ツール＆サービス'] || [])}
        keyword={keyword}
        size='small'
      ></LinkButtons>
      <LinkButtons
        title='npm module'
        items={data && (data['data']['node.jsモジュール'] || [])}
        keyword={keyword}
        size='small'
      ></LinkButtons>
      <LinkButtons
        title='記事'
        items={data && (data['data']['参考記事'] || [])}
        keyword={keyword}
      ></LinkButtons>
      <LinkButtons
        title='フォーム受付'
        items={data && (data['data']['フォーム受付'] || [])}
        keyword={keyword}
      ></LinkButtons>
      <LinkButtons
        title='ブックマークレット'
        items={data && (data['data']['ブックマークレット'] || [])}
        keyword={keyword}
      ></LinkButtons>
      <ScrollPageTop></ScrollPageTop>
    </Layout>
  );
}
