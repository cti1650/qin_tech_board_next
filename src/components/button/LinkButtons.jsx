import { useEffect, useState } from 'react';
import ButtonItem from "./ButtonItem";
import GrayButton from "./GrayButton";
import ListTitle from '../title/ListTitle';

const SearchItems = (lists, word) => {
  return lists.filter((item) => {
    let flg = -1;
    word.split(' ').forEach((keyitem) => {
      if (flg !== 0) {
        flg = ~keywordConv(JSON.stringify(item)).indexOf(keyitem);
      }
    });
    return !word || flg;
  });
}
const keywordConv = (str) => {
  let rep = str
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    })
    .toLowerCase();
  return rep;
}
function LinkButtons(props) {
  const { items,keyword,title } = props;
  const links = SearchItems(items,keyword);
  if(links.length <= 0){return (<></>)};
  return (
    <>
      <ListTitle title={title} />
      <ul className="flex flex-row flex-wrap">
        {
          links && links.map((item)=>{
            return (
              <div className="w-full sm:w-1/2 lg:w-1/4 p-1">
              <ButtonItem item="item">
                <GrayButton url={item['URL']} title={item['ツール名'] ? item['ツール名']: item['名称']} summary={item['分類']} comment={item['備考']} tag={item['タグ']} />
              </ButtonItem>
              </div>
            )
          })
        }
      </ul>
    </>
  )
}

export default LinkButtons

