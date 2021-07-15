import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Layout from '@comp/layout';
import { supabase } from '@util/supabase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faRetweet,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

const Index = () => {
  const router = useRouter();
  const nameEl = useRef(null);
  const categoryEl = useRef(null);
  const descriptionEl = useRef(null);
  const typeEl = useRef(null);
  const tagEl = useRef(null);
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
      supabase
        .from('links')
        .delete()
        .eq('id', data.id)
        .then(() => {
          history.back();
        });
    }
  };
  const cancel = () => {
    history.back();
  };
  const saveDb = (data) => {
    if (window.confirm('『' + data.name + '』の設定を上書きしますか？')) {
      supabase
        .from('links')
        .update({
          name: nameEl.current.value,
          category: categoryEl.current.value,
          description: descriptionEl.current.value,
          tag: tagEl.current.value,
          type: typeEl.current.value,
        })
        .eq('id', data.id)
        .then(() => {
          fetchDb(data.id);
          history.back();
          console.log('save');
        });
    }
  };

  useEffect(() => {
    fetchDb(link_id);
  }, [link_id]);

  useEffect(() => {
    if (db.length === 1) {
      categoryEl.current.value = db[0].category;
      descriptionEl.current.value = db[0].description;
      nameEl.current.value = db[0].name;
      tagEl.current.value = db[0].tag;
      typeEl.current.value = db[0].type;
    }
  }, [db]);

  return (
    <Layout>
      <Head>
        <title>QinTechBoard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {db && db.length === 1 && (
        <>
          <div className='max-w-xl flex flex-col px-4 py-4 spase-y-8 border border-gray-700 dark:text-gray-300 text-black rounded-lg'>
            <div className='w-full text-right'>
              <button
                className='text-gray-700 hover:text-red-400'
                title='削除'
                onClick={() => {
                  deleteDb(db[0]);
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
            <div className='w-full'>
              <div>名称</div>
              <input
                ref={nameEl}
                type='text'
                className='w-full text-2xl text-black rounded-lg px-2'
              ></input>
            </div>
            <div className='w-full pl-4 py-4 whitespace-pre-line break-words'>
              {db[0].url}
            </div>
            <div className='w-full pl-4'>
              <div>区分</div>
              <input
                ref={typeEl}
                type='text'
                className='w-full text-black rounded-lg px-2'
              ></input>
            </div>
            <div className='w-full pl-4'>
              <div>分類</div>
              <input
                ref={categoryEl}
                type='text'
                className='w-full text-black rounded-lg px-2'
              ></input>
            </div>
            <div className='w-full pl-4'>
              <div>タグ</div>
              <input
                ref={tagEl}
                type='text'
                className='w-full text-black rounded-lg px-2'
              ></input>
            </div>
            <div className='w-full pl-4'>
              <div>備考</div>
              <textarea
                ref={descriptionEl}
                className='w-full text-black rounded-lg px-2'
              ></textarea>
            </div>
            <div>
              <button
                className='w-full mt-4 px-4 py-2 border dark:border-gray-600 border-gray-400 dark:bg-gray-700 bg-gray-300 dark:text-gray-200 text-black hover:border-yellow-600 hover:bg-yellow-500 hover:text-black rounded-lg'
                onClick={() => {
                  saveDb(db[0]);
                }}
              >
                保存
              </button>
            </div>
            <div>
              <button
                className='w-full mt-4 px-4 py-2 border dark:border-gray-600 border-gray-400 dark:bg-gray-700 bg-gray-300 dark:text-gray-200 text-black rounded-lg text-center'
                onClick={() => {
                  cancel();
                }}
              >
                キャンセル
              </button>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Index;
