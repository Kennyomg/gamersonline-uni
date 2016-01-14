import db from '../models/index';

export default function getGameList() {
  return new Promise((resolve) => {
    db.Product.all().then(games => {
      resolve(games);
    });
  });
}
