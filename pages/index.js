import Head from 'next/head';
import { useState, useEffect, useRef, useCallback } from 'react';
import Layout from '../src/components/layout';
import LinkButtons from '../src/components/button/LinkButtons';
import LinkButtons2 from '../src/components/button/LinkButtons2';
import { AddLinkButton } from '../src/components/button/AddLinkButton';
import { SupabaseDatas } from '../src/components/button/SupabaseDatas';
import ScrollPageTop from '../src/components/tools/ScrollPageTop';
import { supabase } from '../src/util/supabase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const updateDB = async () => {
  return await supabase.from('type_table').select('*');
};

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const searchElement = useRef(null);
  const doSearch = useCallback(() => {
    setKeyword(searchElement.current.value);
  }, [keyword]);
  const [linksData, setLinksData] = useState([]);
  useEffect(() => {
    if (localStorage.getItem('qin_tech_board_next_search_word')) {
      searchElement.current.value = localStorage.getItem(
        'qin_tech_board_next_search_word'
      );
      setKeyword(localStorage.getItem('qin_tech_board_next_search_word'));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('qin_tech_board_next_search_word', keyword);
  }, [keyword]);
  useEffect(async () => {
    let DB = await updateDB();
    setLinksData(DB.data);
    supabase
      .from('type_table')
      .on('*', async (data) => {
        let DB = await updateDB();
        setLinksData(DB.data);
      })
      .subscribe();
  }, []);
  return (
    <Layout>
      <Head>
        <title>QinTechBoard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='w-full px-4 py-4 mt-4 sticky top-0 bg-black z-30'>
        <div className='flex flex-row'>
          <input
            type='search'
            className='w-full bg-black focus:bg-gray-900 outline-none rounded-full border border-gray-800 px-4 py-1 text-white'
            placeholder='検索'
            ref={searchElement}
            onKeyUp={doSearch}
          ></input>
          {
            <AddLinkButton
              url={keyword}
              onClick={async () => {
                gtag.event({
                  action: 'box_upload',
                  category: 'Upload',
                  label: keyword,
                });
                let DB = await updateDB();
                setLinksData(DB.data);
                doSearch();
              }}
            />
          }
        </div>
      </div>
      <div className='text-xs text-gray-600 text-right'>
        ※ URLを貼り付けて＋を押すと投稿できます！
      </div>
      {linksData &&
        linksData.map((item) => (
          <div>
            <SupabaseDatas
              table_id={item.type}
              size={item.max_len}
              keyword={keyword}
            />
          </div>
        ))}
      <ScrollPageTop></ScrollPageTop>
    </Layout>
  );
}
