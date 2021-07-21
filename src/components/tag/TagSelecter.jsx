import React from 'react';
import cc from 'classcat';
import { useState, useEffect } from 'react';
import { useTagHolder } from '@hooks/useTagHolder';
import { supabase } from '@util/supabase';

export const TagSelecter = (props) => {
  const { onChange = () => {} } = props;
  const [tag, setTag] = useState([]);
  const [tagList, setTagList] = useState([]);
  const { tags, unTags, tagChange } = useTagHolder(tag);
  useEffect(async () => {
    await supabase
      .from('tags')
      .select('*')
      .then((db) => {
        setTag(db.data.map((item) => item.btrim));
      });
  }, []);
  useEffect(() => {
    onChange(tags);
  }, [tags]);
  return (
    <>
      <div>
        {tags && (
          <div className='flex flex-row flex-wrap'>
            {tags.map((item, index) => {
              return (
                <div className='p-1.5'>
                  <label className='p-1.5 border rounded border-red-400 bg-red-200 text-gray-800 text-xs'>
                    <input
                      type='checkbox'
                      className='w-0'
                      name='tags'
                      value={item}
                      onClick={(e) => {
                        tagChange(item);
                      }}
                    />
                    {item}
                  </label>
                </div>
              );
            })}
          </div>
        )}
        {unTags && (
          <div className='flex flex-row flex-wrap'>
            {unTags.map((item, index) => {
              return (
                <div className='p-1.5'>
                  <label className='p-1.5 border rounded border-gray-300 bg-gray-100 text-gray-800 text-xs'>
                    <input
                      type='checkbox'
                      className='w-0'
                      name='tags'
                      value={item}
                      onClick={(e) => {
                        tagChange(item);
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
