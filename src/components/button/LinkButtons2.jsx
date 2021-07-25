import { useEffect, useState } from 'react';
import ButtonItem from './ButtonItem';
import GrayButton from './GrayButton2';
import ListTitle from '../title/ListTitle';
import cc from 'classcat';

const SearchItems = (lists, word) => {
  if (!lists) {
    lists = [];
  }
  return lists.filter((item) => {
    let flg = -1;
    keywordConv(word)
      .split(' ')
      .forEach((keyitem) => {
        if (flg !== 0) {
          flg = ~keywordConv(JSON.stringify(item)).indexOf(keyitem);
        }
      });
    return !word || flg;
  });
};
const keywordConv = (str) => {
  let rep = str
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    })
    .toLowerCase();
  return rep;
};
function LinkButtons2(props) {
  const { items, keyword, title, size } = props;
  const links = SearchItems(items, keyword);
  if (links.length <= 0) {
    return <></>;
  }
  return (
    <>
      <ListTitle title={title} />
      <ul className='flex flex-row flex-wrap'>
        {links &&
          links.map((item, index) => {
            return (
              <div
                key={index}
                className={cc([
                  'w-full',
                  {
                    'sm:w-1/2 lg:w-1/4': size === 'small',
                    'lg:w-1/2': size !== 'small',
                  },
                  'p-1',
                ])}
              >
                <ButtonItem item='item'>
                  <GrayButton
                    id={item['id']}
                    url={item['url']}
                    title={item['name']}
                    summary={item['category']}
                    comment={item['description']}
                    tag={item['tag']}
                  />
                </ButtonItem>
              </div>
            );
          })}
      </ul>
    </>
  );
}

export default LinkButtons2;
