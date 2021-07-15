import * as React from "react";

function ScrollPageTop() {
    function ScrollTop(){
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    return (
      <>
        <div
          className="fixed text-xl p-1 outline-none z-50 dark:bg-gray-700 bg-gray-200 bg-opacity-50 text-center text-gray-400 rounded-full"
          style={{'right':'0.5rem','bottom':'0.5rem','width':'2.5rem','height':'2.5rem','line-none':'','cursor':'pointer'}}
          onClick={ScrollTop}
        >
          ▲
        </div>
      </>
    );
}

export default ScrollPageTop;

