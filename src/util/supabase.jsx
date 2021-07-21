import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export const typeTableDB = async () => {
  return await supabase
    .from('type_table')
    .select('*')
    .then((db) => ({ data: db.data, error: db.error }))
    .catch((e) => ({ data: [], error: e.statusCode }));
};

export const tagsDB = async () => {
  return await supabase
    .from('tags')
    .select('*')
    .then((db) => ({ data: db.data, error: db.error }))
    .catch((e) => ({ data: [], error: e.statusCode }));
};

export const insertDB = async (json) => {
  let data = {
    type: '',
    category: '',
    name: '',
    url: '',
    description: '',
    tag: '',
  };
  data = { ...data, ...json };
  return await supabase
    .from('links')
    .insert([data])
    .then((db) => ({ data: db.data, error: db.error }))
    .catch((e) => ({ data: [], error: e.statusCode }));
};

export const updateLinkUrl = async (url, option = {}) => {
  let json = {
    type: 'アップロード',
    category: 'サイト',
    url: url,
  };
  json = { ...json, ...option };
  if (url) {
    let data = await getUrlProperties(url);
    if (data.title) json = { ...json, name: data.title };
    if (data.description) json = { ...json, description: data.description };
    if (data.keywords) json = { ...json, tag: data.keywords.join(',') };
    await insertDB(json);
    return json;
  }
  return json;
};

const getUrlProperties = async (url) => {
  let response = await axios.get(url);
  // console.log(response.data);
  let html = response.data;
  let head = html.match(/<head(?:[\s\S]*?)>([\s\S]*?)<\/head>/);

  let outputProps = {
    url: url,
    title: '',
    description: '',
    keywords: [],
    'article:tag': [],
    tags: [],
  };

  if (head) {
    const headHtml = head[1];
    let regs = [
      { reg: /<(title)>([\s\S]*?)<\/title>/gi, name: 1, value: 2 },
      {
        reg: /<meta name=(?:"|')([\s\S]*?)(?:"|')(?:[\s]*?)content=(?:"|')([\s\S]*?)(?:"|')(?:[\s]*?)(?: ?\/)?>/gi,
        name: 1,
        value: 2,
      },
      {
        reg: /<meta content=(?:"|')([\s\S]*?)(?:"|')(?:[\s]*?)(?:name|property)=(?:"|')([\s\S]*?)(?:"|')(?:[\s]*?)(?: ?\/)?>/gi,
        name: 2,
        value: 1,
      },
      {
        reg: /<meta property=(?:"|')([\s\S]*?)(?:"|')(?:[\s]*?)content=(?:"|')([\s\S]*?)(?:"|')(?:[\s]*?)(?: ?\/)?>/gi,
        name: 1,
        value: 2,
      },
    ];

    regs.map((item) => {
      let match;
      while ((match = item.reg.exec(headHtml)) != null) {
        let name = match[item.name].toLowerCase();
        let val = match[item.value] || '';
        switch (name) {
          case 'keywords':
            val.split(',').map((item) => {
              outputProps[name] = [...outputProps[name], ...[item]];
            });
            break;
          case 'article:tag':
            outputProps[name] = [...outputProps[name], ...[val]];
            break;
          case 'og:title':
            outputProps.title = outputProps.title || val;
            break;
          case 'og:description':
            outputProps.description = outputProps.description || val;
            break;
          default:
            // console.log(name + ' : ' + val);
            outputProps[name] = val;
        }
      }
    });

    outputProps['tags'] = Array.from(
      new Set([...outputProps['keywords'], ...outputProps['article:tag']])
    );
  }
  return outputProps;
};
