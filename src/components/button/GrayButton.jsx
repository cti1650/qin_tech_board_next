import * as React from "react";
import TagList from '../tag/TagList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

function GrayButton(props) {
  const { title,summary,comment,tag } = props;
  return (
    <>
      <a href={props.url} target="_blank" rel="noopener noreferrer">
        <div className="h-full bg-gray-800 hover:shadow-inner hover:bg-gray-300 rounded-lg outline-none border border-gray-600 px-3 py-1.5 shadow-lg text-white hover:text-black">
          <div className="text-xs text-gray-500">{ summary || '' }</div>
          <div className="text-xl">{ title || '' } <FontAwesomeIcon icon={faChevronRight} /></div>
          <div className="text-xs text-gray-500 px-4">{ comment || '' }</div>
          <div className="text-gray-500 text-xs"><TagList tag={tag || ''}/></div>
        </div>
      </a>
    </>
  );
}

export default GrayButton;
