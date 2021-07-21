import { useEffect, useState, useCallback } from 'react';

export const useLinkFilter = (url) => {
  const [linkFlag, setLinkFlag] = useState(false);
  useEffect(() => {
    setLinkFlag(
      url.match(
        /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+/g
      )
        ? url
        : ''
    );
  }, [url]);
  return { url, linkFlag };
};
