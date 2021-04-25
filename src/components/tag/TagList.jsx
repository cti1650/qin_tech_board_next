import * as React from "react";

const parseTag = (tagStr) => {
    if (tagStr) {
      return tagStr
        .split(',')
        .map((item) => {
          if (~item.indexOf('#')) {
            return item.trim();
          } else {
            return '#' + item.trim();
          }
        })
        .join(' ');
    } else {
      return '';
    }
  };

function TagList(props) {
    const { items,keyword } = props;
  return (
    <>
        {parseTag(props.tag)}
    </>
  );
}
export default TagList;