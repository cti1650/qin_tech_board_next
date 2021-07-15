import axios from 'axios';

export default async (req, res) => {
  const url =
    'https://cookpad.com/search/' +
    encodeURIComponent('卵') +
    '?page=4&tsukurepo_count=1000';
  const data = await axios
    .get(url)
    .then((value) => {
      return value.data.match(/<img ([\s\S]*?)\/>/gi).map((value) => {
        console.log(value);
        return value;
      });
    })
    .catch((e) => {
      return e.statusCode;
    });
  console.log(data);
  res.statusCode = 200;
  res.json({ name: data });
};
