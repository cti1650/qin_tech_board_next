import axios from 'axios';
import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'POST', 'HEAD'],
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200,
})

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

async function handler(req, res) {
  await runMiddleware(req, res, cors);
  if(req.query.url){
    return res.status(200).json(await getUrlProperties(req.query.url));
  }else{
    return res.status(200).json({
      url:'',
      title:'',
      description:'',
      tags:[],
    });
  };
};

export default handler;

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
