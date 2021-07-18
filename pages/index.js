import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef, useCallback } from 'react';
import Layout from '@comp/layout';
import LinkButtons from '@comp/button/LinkButtons';
import LinkButtons2 from '@comp/button/LinkButtons2';
import { AddLinkButton } from '@comp/button/AddLinkButton';
import { SupabaseDatas } from '@comp/button/SupabaseDatas';
import ScrollPageTop from '@comp/tools/ScrollPageTop';
import { supabase } from '@util/supabase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useHotkeys } from 'react-hotkeys-hook';
import * as gtag from '@lib/gtag';

const updateDB = async () => {
  return await supabase.from('type_table').select('*');
};

export default function Home() {
  const router = useRouter();
  const { q } = router.query;
  console.log(q);
  const [keyword, setKeyword] = useState(q || '');
  const searchElement = useRef(null);
  const doSearch = useCallback(() => {
    setKeyword(searchElement.current.value);
  }, [keyword]);
  const [linksData, setLinksData] = useState([]);
  useHotkeys('ctrl+s, command+s, ctrl+f, command+f', (evt) => {
    searchElement.current.focus();
    evt.preventDefault();
  });
  useHotkeys('ctrl+c, command+c', (evt) => {
    searchElement.current.value = '';
    doSearch();
    searchElement.current.focus();
    evt.preventDefault();
  });
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
        <div className='flex flex-row'>
          <input
            type='search'
            name='q'
            className='w-full dark:bg-black bg-gray-100 dark:focus:bg-gray-900 focus:bg-white outline-none rounded-full border dark:border-gray-800 border-gray-400 px-4 py-1 dark:text-white text-black'
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
