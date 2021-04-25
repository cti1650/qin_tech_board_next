import Head from 'next/head';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import Layout from '../src/components/layout';
import SearchLink from '../src/components/data/SearchLink';
import GrayButton from '../src/components/button/GrayButton';
import ButtonItem from '../src/components/button/ButtonItem';
import LinkButtons from '../src/components/button/LinkButtons';
import ScrollPageTop from '../src/components/tools/ScrollPageTop';
import GoogleForm from '../src/components/tools/GoogleForm';
import ListTitle from '../src/components/title/ListTitle';
import Posts from '../src/components/home/posts';
import TitleMessage from '../src/components/qin/TitleMessage';
import MembersTextbox from '../src/components/qin/Textbox';
import Description from '../src/components/qin/Description';
import Editarea from '../src/components/qin/Editarea';
import MemberTag from '../src/components/qin/MemberTag';
import CircleColor from '../src/components/color/CircleColor';

import axios from 'axios';

export default function Home() {
  const [items, setItems] = useState([]);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    'https://script.google.com/macros/s/AKfycbzdElyGY3H5HYcoUKOxOG9-F7LpmwlPe2y13jZv3lskhajjF20A4KiZNT7e6EoMvF2aOQ/exec',
    fetcher,
    {
      refreshInterval: 5000,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );
  const [keyword, setKeyword] = useState('');
  const keywordConv = (str) => {
    let rep = str
      .replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
      })
      .toLowerCase();
    return rep;
  };
  function doSearch(e) {
    setKeyword(e.target.value);
  }
  if (!data) return <div>load</div>;
  return (
    <Layout>
      <Head>
        <title>QinTechBoard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='w-full px-4 mt-4'>
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
        items={data['data'] && (data['data']['ツール＆サービス'] || [])}
        keyword={keyword}
      ></LinkButtons>
      <LinkButtons
        title='npm module'
        items={data['data'] && (data['data']['node.jsモジュール'] || [])}
        keyword={keyword}
      ></LinkButtons>
      <LinkButtons
        title='記事'
        items={data['data'] && (data['data']['参考記事'] || [])}
        keyword={keyword}
      ></LinkButtons>
      <LinkButtons
        title='フォーム受付'
        items={data['data'] && (data['data']['フォーム受付'] || [])}
        keyword={keyword}
      ></LinkButtons>
      <LinkButtons
        title='ブックマークレット'
        items={data['data'] && (data['data']['ブックマークレット'] || [])}
        keyword={keyword}
      ></LinkButtons>
      <ScrollPageTop></ScrollPageTop>
    </Layout>
  );
}
