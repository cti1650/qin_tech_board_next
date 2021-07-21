import { updateLinkUrl } from '@util/supabase';
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
  console.log(req);
  return res
    .status(200)
    .json(await updateLinkUrl(req.body.url || req.query.url));
};

export default handler;
