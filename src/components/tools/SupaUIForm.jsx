import * as React from 'react';
import { useRef, useState, useCallback } from 'react';
import axios from 'axios';
import { Input, Button } from '@supabase/ui';
import { insertDB } from '@util/supabase';

export const SupaUIForm = (props) => {
  const InputType = useRef(null);
  const InputCategory = useRef(null);
  const InputName = useRef(null);
  const InputURL = useRef(null);
  const [InputDesc, setInputDesc] = useState('');
  const [InputTag, setInputTag] = useState('');

  const handleDescChange = useCallback(
    (e) => {
      setInputDesc(e.target.value);
    },
    [InputDesc]
  );
  const handleTagChange = useCallback(
    (e) => {
      setInputTag(e.target.value);
    },
    [InputTag]
  );
  const handleUpdata = async () => {
    await insertDB({
      url: InputURL.current.value,
      category: InputCategory.current.value,
      type: InputType.current.value,
      name: InputName.current.value,
      description: InputDesc,
      tag: InputTag,
    });
    alert(`『${InputURL.current.value}』のサイトを投稿しました！`);
    InputName.current.value = '';
    InputURL.current.value = '';
    setInputDesc('');
    setInputTag('');
  };
  return (
    <>
      <div className='flex flex-col space-y-2'>
        <Input inputRef={InputType} label='区分' defaultValue='アップロード' />
        <Input inputRef={InputCategory} label='分類' defaultValue='サイト' />
        <Input inputRef={InputName} label='名称' defaultValue='' />
        <Input inputRef={InputURL} label='URL' defaultValue='' />
        <Input.TextArea
          value={InputDesc}
          label='備考'
          onChange={handleDescChange}
          defaultValue=''
        />
        <Input.TextArea
          value={InputTag}
          label='タグ'
          onChange={handleTagChange}
          defaultValue=''
        />
        <Button size='large' onClick={handleUpdata} block>
          送信
        </Button>
      </div>
    </>
  );
};
