import cc from 'classcat';
import { supabase } from '@util/supabase';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faStar } from '@fortawesome/free-solid-svg-icons';

export const CommentBoard = (props) => {
  const { className } = props;
  const messageEl = useRef(null);
  const [ideas, setIdeas] = useState([]);
  const [edit, setEdit] = useState(false);
  const [startId, setStartId] = useState('');
  const [limit, setLimit] = useState(3);
  const loadDB = useCallback(() => {
    supabase
      .from('kaizen')
      .select('*')
      .eq('complete', false)
      .order('createAt', { ascending: false })
      .limit(limit)
      .then((db) => {
        if (db.data && !db.error) {
          setIdeas(db.data);
        } else {
          setIdeas([]);
        }
      });
  }, [limit]);
  const insertDB = useCallback(() => {
    if (!messageEl.current.value) {
      alert('コメントを投稿するには値を入力して下さい！');
      return null;
    }
    return supabase
      .from('kaizen')
      .insert({ question: messageEl.current.value })
      .then(() => {
        loadDB();
        alert('コメントを投稿しました！');
      })
      .catch((e) => {
        alert('エラーが発生したためコメントを投稿出来ませんでした');
      });
  }, [limit]);
  const deleteDB = useCallback(
    (id) => {
      if (!id) return null;
      return supabase
        .from('kaizen')
        .delete()
        .eq('id', id)
        .then(() => {
          loadDB();
        });
    },
    [limit]
  );
  const changeStarDB = useCallback(
    (id, star) => {
      if (!id) return null;
      return supabase
        .from('kaizen')
        .update({ star: !star })
        .eq('id', id)
        .then(() => {
          loadDB();
        });
    },
    [limit]
  );
  const handleEditChange = useCallback(() => {
    setEdit((prev) => {
      return !prev;
    });
  }, []);
  useEffect(() => {
    loadDB();
    let subscribe = supabase
      .from('kaizen')
      .on('*', () => {
        loadDB();
      })
      .subscribe();
    return () => {
      subscribe.unsubscribe();
    };
  }, [limit]);
  useEffect(async () => {
    await supabase
      .from('kaizen')
      .select('*')
      .eq('complete', false)
      .order('createAt', { ascending: true })
      .limit(1)
      .single()
      .then((db) => {
        setStartId(db.data.id);
      });
  }, []);
  const addMessage = useCallback(() => {
    insertDB();
    messageEl.current.value = '';
  }, [limit]);
  const addLimit = useCallback(() => {
    if (
      ideas.filter((val) => {
        return val.id === startId;
      }).length === 1
    ) {
      return;
    }
    setLimit((prev) => prev + 5);
  }, [limit, ideas, startId]);
  return (
    <>
      <div className={cc(['flex flex-col w-full pt-4', className])}>
        <div className='dark:text-white text-black'>コメント</div>
        <div className='w-full flex flex-col'>
          <div className='w-full'>
            <textarea
              ref={messageEl}
              className='w-full h-16 p-2 rounded shadow-inner outline-none'
            ></textarea>
          </div>
          <div className='p-1'>
            <button
              onClick={addMessage}
              className='w-full py-2 bg-gray-100 border border-gray-300 outline-none hover:outline-none rounded shadow'
            >
              送信
            </button>
          </div>
          <div className='p-1 text-right'>
            <label>
              <span className='px-2 text-sm dark:text-white text-black'>
                編集
              </span>
              <input
                type='checkbox'
                onClick={handleEditChange}
                className='outline-none'
              />
            </label>
          </div>
        </div>
        <div className='py-2'>
          {ideas &&
            ideas.map((val, index) => {
              const day = new Date(val.createAt).toLocaleString('ja-JP');
              return (
                <div key={index} className='p-1 space-y-2'>
                  <div
                    className={cc([
                      'relative ml-0 mr-auto w-4/5 p-1 rounded-xl',
                      {
                        'bg-gray-50': !val.star,
                        'bg-yellow-100 border-2 border-yellow-500': val.star,
                      },
                    ])}
                  >
                    <div className='text-xs'>{day}</div>
                    <div className='text-sm pl-2'>{val.question}</div>
                    {edit && (
                      <div className='absolute top-0 right-0 flex flex-row space-x-1.5 py-0.5 px-2'>
                        <div
                          className={cc([
                            'text-xs outline-none hover:outline-none',
                            {
                              'text-gray-400 hover:text-yellow-400': !val.star,
                              'text-yellow-400': val.star,
                            },
                          ])}
                        >
                          <button
                            className='outline-none'
                            onClick={() => {
                              changeStarDB(val.id, val.star);
                            }}
                          >
                            <FontAwesomeIcon icon={faStar} />
                          </button>
                        </div>
                        <div className='text-xs text-gray-400 hover:text-pink-400 outline-none hover:outline-none'>
                          <button
                            className='outline-none'
                            onClick={() => {
                              deleteDB(val.id);
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {val.answer && (
                    <div className='ml-auto mr-0 w-4/5 p-1 bg-blue-100 rounded-xl'>
                      <div className='text-sm pl-2'>{val.answer}</div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
        <div className='p-1'>
          {ideas &&
            ideas.filter((val) => {
              return val.id === startId;
            }).length === 0 && (
              <button
                onClick={addLimit}
                className='w-full py-2 bg-gray-100 border border-gray-300 outline-none rounded shadow'
              >
                さらに表示する
              </button>
            )}
        </div>
      </div>
    </>
  );
};
