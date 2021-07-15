import Head from 'next/head';
import { useState, useEffect, useRef, useCallback } from 'react';
import Layout from '../src/components/layout';
import LinkButtons from '../src/components/button/LinkButtons';
import LinkButtons2 from '../src/components/button/LinkButtons2';
import { SupabaseDatas } from '../src/components/button/SupabaseDatas';
import ScrollPageTop from '../src/components/tools/ScrollPageTop';
import { supabase } from '../src/util/supabase';

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
      <div className='w-full px-4 py-4 mt-4 sticky top-0 dark:bg-black bg-gray-200 z-30'>
        <input
          type='search'
          className='w-full dark:bg-black bg-gray-100 dark:focus:bg-gray-900 focus:bg-white outline-none rounded-full border dark:border-gray-800 border-gray-400 px-4 py-1 dark:text-white text-black'
          placeholder='検索'
          ref={searchElement}
          onKeyUp={doSearch}
        ></input>
      </div>
      {linksData &&
        linksData.map((item) => (
          <div>
            <SupabaseDatas
              table_id={item.type}
              size={item.max_len}
              keyword={'vue ' + keyword}
            />
          </div>
        ))}
      <ScrollPageTop></ScrollPageTop>
    </Layout>
  );
}
