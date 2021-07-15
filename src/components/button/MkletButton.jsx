import * as React from "react";

function MkletButton({ children }) {
  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="dark:text-white text-black">ブックマークバーへドラッグ⇒</div>
        <div
          className="dark:bg-gray-800 bg-gray-50 hover:shadow-inner hover:bg-gray-300 rounded-lg outline-none border border-gray-600 px-2 py-1 shadow-lg dark:text-white text-black hover:text-black"
        >
          <a href="javascript:(async function(d){let URL='https://script.google.com/macros/s/AKfycbzdElyGY3H5HYcoUKOxOG9-F7LpmwlPe2y13jZv3lskhajjF20A4KiZNT7e6EoMvF2aOQ/exec?url='+location.href+'&title='+document.title;await fetch(URL).then((data)=>{window.alert('%E4%BB%A5%E4%B8%8B%E3%81%AE%E3%83%87%E3%83%BC%E3%82%BF%E3%82%92%E6%8A%95%E7%A8%BF%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F%EF%BC%81'+'\n'+document.title);});})(document);/*__mklet_title:QinTechBoard%E3%81%B8%E8%BF%BD%E5%8A%A0__*/">QinTechBoardへ投稿</a>
        </div>
      </div>
    </>
  );
}

export default MkletButton;
