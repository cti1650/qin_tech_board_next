import * as React from "react";

function GrayButton(props) {
  return (
    <>
        <a href={props.url} target="_blank" rel="noopener noreferrer">
        <div className="h-full bg-gray-800 hover:shadow-inner hover:bg-gray-300 rounded-lg outline-none border border-gray-600 px-2 py-1 shadow-lg text-white hover:text-black">
        <div className="text-xs text-gray-500">{ props.summary  || '' }</div><div className="text-xl">{ props.title }</div>
        </div>
        </a>
    </>
  );
}

export default GrayButton;
