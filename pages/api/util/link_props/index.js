import axios from 'axios';

export default async (req, res) => {
  return res.status(200).json(await getUrlProperties(req.query.url));
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
        reg: /<meta name=(?:"|')([\s\S]*?)(?:"|')(?:[\s]*?)content=(?:"|')([\s\S]*?)(?:"|')(?:[\s]*?)(?:\/)?>/gi,
        name: 1,
        value: 2,
      },
      {
        reg: /<meta content=(?:"|')([\s\S]*?)(?:"|')(?:[\s]*?)(name|property)=(?:"|')([\s\S]*?)(?:"|')(?:[\s]*?)(?:\/)?>/gi,
        name: 2,
        value: 1,
      },
      {
        reg: /<meta property=(?:"|')([\s\S]*?)(?:"|')(?:[\s]*?)content=(?:"|')([\s\S]*?)(?:"|')(?:[\s]*?)(?:\/)?>/gi,
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
          default:
            console.log(name + ' : ' + val);
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
