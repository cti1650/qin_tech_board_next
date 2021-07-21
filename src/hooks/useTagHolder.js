import { useCallback, useEffect, useState } from 'react';

export const useTagHolder = (defaultTags) => {
  const [tags, setTags] = useState([]);
  const [unTags, setUnTags] = useState(defaultTags || []);
  const tagChange = useCallback(
    (tag) => {
      if (~tags.indexOf(tag)) {
        setTags((prev) => {
          return prev.filter((value) => {
            return value !== tag;
          });
        });
      } else {
        setTags((prev) => {
          return [...prev, tag];
        });
      }
    },
    [unTags, defaultTags]
  );
  useEffect(() => {
    setUnTags((prev) => {
      return defaultTags.filter((value) => {
        return !~tags.indexOf(value);
      });
    });
  }, [tags, defaultTags]);
  return {
    tags,
    unTags,
    tagChange,
  };
};
