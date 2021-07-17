import { updateLinkUrl } from '@util/supabase';

export default async (req, res) => {
  console.log(req);
  return res
    .status(200)
    .json(await updateLinkUrl(req.body.url || req.query.url));
};
