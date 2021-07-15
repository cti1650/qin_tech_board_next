import * as React from "react";
import { useState } from 'react';
import Link from 'next/link';
import TagList from '../tag/TagList';
import { Detail } from '../board/Detail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faRetweet,faEdit } from '@fortawesome/free-solid-svg-icons';

import * as gtag from '../../lib/gtag';

function GrayButton(props) {
  const { id,url,title,summary,comment,tag } = props;
  const [flag,setFlag] = useState(true);
  const noRef = "noopener noreferrer";
  const searchUrl = "https://www.google.com/search?q=";
  const translateUrl = "https://translate.google.com/translate?sl=auto&tl=ja&u=";
  return (
    <>
      <a href={url} onClick={()=>{
        gtag.event({
          action: 'link_click',
          category: 'Click',
          label: title,
        })
      }} target="_blank" rel={noRef}>
        <div className="h-full z-30 dark:bg-gray-800 bg-gray-50 hover:shadow-inner hover:bg-gray-300 rounded-lg outline-none border border-gray-600 px-3 py-1.5 shadow-lg dark:text-white text-black hover:text-black">
          <div className="text-xs text-gray-500 flex flex-row"><div className="mr-auto ml-0">{ summary || '' }</div><div className="z-10"><Link href={"/link/" + id}><a className="px-1 z-10" rel={noRef}><FontAwesomeIcon icon={faEdit} /></a></Link></div></div>
          <div className="text-xl">{ title || '' } <a href={searchUrl + title} className="px-1" target="_blank" rel={noRef}><FontAwesomeIcon icon={faSearch} /></a><a href={translateUrl + url} className="px-1" target="_blank" rel={noRef}><FontAwesomeIcon icon={faRetweet} /></a></div>
          <div className="text-xs text-gray-500 px-4">{ comment || '' }</div>
          <div className="text-gray-500 text-xs"><TagList tag={tag || ''}/></div>
        </div>
      </a>
    </>
  );
}

export default GrayButton;
