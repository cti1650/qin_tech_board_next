import * as React from "react";
import TagList from '../tag/TagList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faRetweet } from '@fortawesome/free-solid-svg-icons';

function GrayButton(props) {
  const { url,title,summary,comment,tag } = props;
  const noRef = "noopener noreferrer";
  const searchUrl = "https://www.google.com/search?q=";
  const translateUrl = "https://translate.google.com/translate?sl=auto&tl=ja&u=";
  return (
    <>
      <a href={url} target="_blank" rel={noRef}>
        <div className="h-full bg-gray-800 hover:shadow-inner hover:bg-gray-300 rounded-lg outline-none border border-gray-600 px-3 py-1.5 shadow-lg text-white hover:text-black">
          <div className="text-xs text-gray-500">{ summary || '' }</div>
          <div className="text-xl">{ title || '' } <a href={searchUrl + title} className="px-1" target="_blank" rel={noRef}><FontAwesomeIcon icon={faSearch} /></a><a href={translateUrl + url} className="px-1" target="_blank" rel={noRef}><FontAwesomeIcon icon={faRetweet} /></a></div>
          <div className="text-xs text-gray-500 px-4">{ comment || '' }</div>
          <div className="text-gray-500 text-xs"><TagList tag={tag || ''}/></div>
        </div>
      </a>
    </>
  );
}

export default GrayButton;
