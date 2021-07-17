import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { supabase, updateLinkUrl } from '@util/supabase';

const linkDB = async (url) => {
  return await supabase.from('links').select('*').eq('url', url);
};
const uploadLinkforGAS = (url) => {
  axios({
    method: 'get',
    url: '/api/push?url=' + encodeURIComponent(url),
  }).then(() => {
    alert('アップロードが完了しました！');
  });
};
const uploadLink = async (url) => {
  axios
    .post('/api/util/link_add', {
      url: url,
    })
    .then(() => {
      alert('アップロードが完了しました！！');
    });
};

export const AddLinkButton = (props) => {
  const { url, onClick } = props;
  const [pageData, setPageData] = useState([]);

  const handleClick = async (e) => {
    await uploadLink(url);
    onClick && onClick(e);
  };

  useEffect(async () => {
    let DB = await linkDB(url);
    setPageData(DB.data);
  }, [url]);
  return (
    <>
      {url &&
        pageData &&
        pageData.length === 0 &&
        url.match(
          /^(?:[^:\/?#]+:)?(?:\/\/[^\/?#]*)?(?:([^?#]*\/)([^\/?#]*))?(\?[^#]*)?(?:#.*)?$/
        ) && (
          <div>
            <button
              className='w-full dark:bg-black bg-gray-200 outline-none rounded-full border-none px-4 py-1 dark:text-white text-black hover:text-red-300 focus:outline-none'
              onClick={handleClick}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        )}
    </>
  );
};
