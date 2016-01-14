import db from '../models/index';

export default function createGame(req) {
  return new Promise((resolve) => {
    db.Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      releasedate: req.body.releasedate,
    }).then(createdGame => {
      const game = {
        id: createdGame.id,
        name: createdGame.name,
        description: createdGame.description,
        price: createdGame.price,
        releasedate: createdGame.releasedate,
      };
      resolve(game);
    });
  });
}
