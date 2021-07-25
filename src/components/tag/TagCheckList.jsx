import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { supabase } from '@util/supabase';
import { tagsDB } from '@util/supabase';

const parseTag = (tagStr) => {
  if (tagStr) {
    return tagStr.split(',').map((item) => {
      if (~item.indexOf('#')) {
        return item.trim();
      } else {
        return '#' + item.trim();
      }
    });
  } else {
    return [];
  }
};

const tags = ['tag', 'icon', 'img'];

export const TagCheckList = (props) => {
  const [tag, setTag] = useState([]);
  useEffect(async () => {
    await supabase
      .from('tags')
      .select('*')
      .then((db) => {
        setTag(db.data);
      });
  }, []);
  return (
    <>
      <div>
        {tag && (
          <div className='flex flex-row flex-wrap'>
            {tag.map((item, index) => {
              return (
                <div className='p-1'>
                  <Link href={'/' + item.btrim}>
                    <a>
                      <div className='p-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 text-sm'>
                        {item.btrim}
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
