//useState と useEffectをreactからimport
import { useState, useEffect } from "react";
//API通信はaxiosを使います
import axios from "axios";

const SearchLink = word => {
　// 先ほどと同じようにMovieListにAPI通信結果をstate保持させていきます。
  const [movieList, setMovieList] = useState([]);
  const fetchMovie = async word => {
    const response = await axios.get(
      `https://script.google.com/macros/s/AKfycbzdElyGY3H5HYcoUKOxOG9-F7LpmwlPe2y13jZv3lskhajjF20A4KiZNT7e6EoMvF2aOQ/exec`
      // 持ってきたwordはここのAPI処理に使われる
    );
    const data = response.data.results;
    console.log(data)
    setMovieList(data);
    // APIで返る値をmoviesに保持
  };

  useEffect(() => {
    // レンダリングの後になんらかの処理を動作させるメソッド。
    fetchMovie(word);
  }, [word]);
  // 第二引数に変数を与えると、最初のレンダリング時と、
  // 変数の値が変更された時のみメソッドが動く

  return movieList;
};

export default SearchLink;