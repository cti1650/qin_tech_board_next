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
  const loadDB = useCallback(() => {
    return supabase
      .from('kaizen')
      .select('*')
      .eq('complete', false)
      .order('createAt', { ascending: false })
      .then((db) => {
        if (db.data && !db.error) {
          setIdeas(db.data);
        } else {
          setIdeas([]);
        }
      });
  }, []);
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
  }, []);
  const deleteDB = useCallback((id) => {
    if (!id) return null;
    return supabase
      .from('kaizen')
      .delete()
      .eq('id', id)
      .then(() => {
        loadDB();
      });
  }, []);
  const changeStarDB = useCallback((id, star) => {
    if (!id) return null;
    return supabase
      .from('kaizen')
      .update({ star: !star })
      .eq('id', id)
      .then(() => {
        loadDB();
      });
  }, []);
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
  }, []);
  const addMessage = useCallback(() => {
    insertDB();
    messageEl.current.value = '';
  }, []);
  return (
    <>
      <div className={cc(['flex flex-col w-full pt-4', className])}>
        <div>コメント</div>
        <div className='w-full flex flex-col'>
          <div className='w-full'>
            <textarea
              ref={messageEl}
              className='w-full h-16 p-2 rounded shadow-inner'
            ></textarea>
          </div>
          <div className='p-1'>
            <button
              onClick={addMessage}
              className='w-full py-2 bg-gray-100 border border-gray-300 rounded shadow'
            >
              送信
            </button>
          </div>
          <div className='p-1 text-right'>
            <label>
              <span className='px-2 text-sm'>編集</span>
              <input type='checkbox' onClick={handleEditChange} className='' />
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
                            'text-xs  outline-none',
                            {
                              'text-gray-400 hover:text-yellow-400': !val.star,
                              'text-yellow-400': val.star,
                            },
                          ])}
                        >
                          <button
                            onClick={() => {
                              changeStarDB(val.id, val.star);
                            }}
                          >
                            <FontAwesomeIcon icon={faStar} />
                          </button>
                        </div>
                        <div className='text-xs text-gray-400 hover:text-pink-400 outline-none'>
                          <button
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
      </div>
    </>
  );
};
