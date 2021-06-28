import Head from 'next/head';
import { useState, useEffect } from 'react';
import Layout from '../src/components/layout';
import LinkButtons from '../src/components/button/LinkButtons';
import LinkButtons2 from '../src/components/button/LinkButtons2';
import { SupabaseDatas } from '../src/components/button/SupabaseDatas';
import ScrollPageTop from '../src/components/tools/ScrollPageTop';
import { supabase } from '../src/util/supabase';

const updateDB = async () => {
  return await supabase.from('type_list').select('*');
};

export default function Home() {
  const [keyword, setKeyword] = useState('');
  function doSearch(e) {
    setKeyword(e.target.value);
  }
  const [linksData, setLinksData] = useState([]);
  useEffect(async () => {
    let DB = await updateDB();
    setLinksData(DB.data);
    supabase
      .from('type_list')
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
        <input
          type='search'
          className='w-full bg-black focus:bg-gray-900 outline-none rounded-full border border-gray-800 px-4 py-1 text-white'
          placeholder='検索'
          value={keyword}
          onChange={(e) => doSearch(e)}
        ></input>
      </div>
      {linksData &&
        linksData.map((item) => (
          <div>
            <SupabaseDatas table_id={item.type} keyword={'react ' + keyword} />
          </div>
        ))}
      <ScrollPageTop></ScrollPageTop>
    </Layout>
  );
}
