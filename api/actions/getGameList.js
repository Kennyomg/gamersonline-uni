import db from '../models/index';

export default function getGameList() {
  return new Promise((resolve) => {
    db.Product.all({include: [ db.SpecialEdition ]}).then(games => {
      resolve(games);
    });
  });
}
