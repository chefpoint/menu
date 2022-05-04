import pjson from '../../package.json';

export default async function version(req, res) {
  return new Promise((resolve, reject) => {
    res.status(200).send({ latest: pjson.version });
    resolve();
  });
}
