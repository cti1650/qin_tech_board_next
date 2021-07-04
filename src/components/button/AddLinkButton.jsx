import { useCallback, useEffect,useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { supabase } from '../../util/supabase';

const linkDB = async (url) => {
  return await supabase.from('links')
  .select('*')
  .eq('url',url);
};
const uploadLink = (url) => {
  axios({
    method: 'get',
    url:'https://script.google.com/macros/s/AKfycbzdElyGY3H5HYcoUKOxOG9-F7LpmwlPe2y13jZv3lskhajjF20A4KiZNT7e6EoMvF2aOQ/exec?url='+encodeURIComponent(url)
  })
    .then(()=>{
      alert('アップロードが完了しました！')
    });
};

export const AddLinkButton = (props) => {
  const { url,onClick } = props;
  const [pageData,setPageData] = useState([]);

  const handleClick = async (e)=>{
    uploadLink(url);
    onClick && onClick(e);
    let DB = await linkDB(url);
    setPageData(DB.data);
  };

  useEffect(async ()=>{
    let DB = await linkDB(url);
    setPageData(DB.data);
  },[url])
  return (
    <>
      {url && pageData && pageData.length === 0 && url.match(/^(?:[^:\/?#]+:)?(?:\/\/[^\/?#]*)?(?:([^?#]*\/)([^\/?#]*))?(\?[^#]*)?(?:#.*)?$/) &&
      (<div>
        <button className='w-full bg-black outline-none rounded-full border-none px-4 py-1 text-white hover:text-red-300 focus:outline-none' onClick={handleClick}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>)}
    </>
  );
}