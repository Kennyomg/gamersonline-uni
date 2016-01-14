import db from '../models/index';

export default function getGame(req) {
  return new Promise((resolve) => {
    db.Product.findOne({
      where: {
        id: req.body.gameId,
      },
      include: [ db.SpecialEdition ]
    }).then(game => {
      resolve(game);
    });
  });
}
