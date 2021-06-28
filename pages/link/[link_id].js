import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Layout from '../../src/components/layout';
import { supabase } from '../../src/util/supabase';

const Index = () => {
  const router = useRouter();
  // パスパラメータから値を取得
  const { link_id } = router.query;
  const [db, setDb] = useState([]);

  const fetchDb = (link_id) => {
    supabase
      .from('links')
      .select('*')
      .eq('id', link_id)
      .then(({ data, error }) => {
        setDb(data);
      });
  };

  const deleteDb = (data) => {
    if (window.confirm('『' + data.name + '』を削除しますか？')) {
      supabase.from('links').delete().eq('id', data.id);
    }
  };

  useEffect(() => {
    fetchDb(link_id);
  }, [link_id]);

  return (
    <Layout>
      <Head>
        <title>QinTechBoard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {db && db.length === 1 && (
        <>
          <div className='flex flex-col px-4 py-8 spase-y-8 border border-gray-700 text-gray-300 rounded-lg'>
            <div className='text-2xl'>{db[0].name}</div>
            <div className='pl-4'>{db[0].url}</div>
            <div className='pl-4'>{db[0].description}</div>
            <div className='pl-4'>{db[0].category}</div>
            <div className='pl-4'>{db[0].type}</div>
            <div>
              <button
                className='w-full mt-4 px-4 py-2 border border-red-600 bg-red-400 text-black rounded-lg'
                onClick={() => {
                  deleteDb(db[0]);
                }}
              >
                削除
              </button>
            </div>
            <div>
              <Link href='/index2' scroll={false}>
                <a>
                  <div className='w-full mt-4 px-4 py-2 border border-gray-400 bg-gray-500 text-gray-200 rounded-lg text-center'>
                    キャンセル
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Index;
