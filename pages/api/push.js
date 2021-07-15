import axios from 'axios';

export default async (req, res) => {
  const url =
    'https://script.google.com/macros/s/AKfycbzdElyGY3H5HYcoUKOxOG9-F7LpmwlPe2y13jZv3lskhajjF20A4KiZNT7e6EoMvF2aOQ/exec?url=' +
    encodeURIComponent(req.query.url);
  return await axios
    .get(url)
    .then((data) => {
      res.status(200).json(data.json);
    })
    .catch((e) => {
      res.status(200).json({});
    });
};
