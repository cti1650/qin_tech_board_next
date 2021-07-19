import React from 'react';
import cc from 'classcat';
import { useState, useEffect } from 'react';
import { supabase } from '@util/supabase';

export const TagSelecter = (props) => {
  const { onChange = () => {} } = props;
  const [tag, setTag] = useState([]);
  const [tagList, setTagList] = useState([]);
  useEffect(async () => {
    await supabase
      .from('tags')
      .select('*')
      .then((db) => {
        setTag(db.data.map((item) => item.btrim));
      });
  }, []);
  useEffect(() => {
    onChange(tagList);
  }, [tagList]);
  return (
    <>
      <div>
        {tag && (
          <div className='flex flex-row flex-wrap'>
            {tag.map((item, index) => {
              return (
                <div className='p-1.5'>
                  <label
                    className={cc([
                      'p-1.5 border rounded',
                      {
                        'border-red-400 bg-red-200 text-gray-800 text-xs':
                          ~tagList.indexOf(item),
                        'border-gray-300 bg-gray-100 text-gray-800 text-xs':
                          !~tagList.indexOf(item),
                      },
                    ])}
                  >
                    <input
                      type='checkbox'
                      className='w-0'
                      name='tags'
                      value={item}
                      onClick={(e) => {
                        setTagList((prev) => {
                          if (e.target.checked) {
                            if (~prev.indexOf(item)) {
                              return prev;
                            } else {
                              return [...prev, item];
                            }
                          } else {
                            return prev.filter((val) => {
                              return val === item ? false : val;
                            });
                          }
                        });
                      }}
                    />
                    {item}
                  </label>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
