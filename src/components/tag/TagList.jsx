import * as React from 'react';

const parseTag = (tagStr) => {
  if (tagStr) {
    return tagStr.split(',').map((item) => {
      if (~item.indexOf('#')) {
        return item.trim();
      } else {
        return '#' + item.trim();
      }
    });
  } else {
    return [];
  }
};

function TagList(props) {
  const { items, keyword } = props;
  return (
    <div className='flex flex-row flex-wrap space-x-1'>
      {parseTag(props.tag).map((item) => {
        return <div className='rounded-sm text-gray-500'>{item}</div>;
      })}
    </div>
  );
}
export default TagList;
