import db from '../models/index';
import fs from 'fs';

export default function createGame(req) {
  return new Promise((resolve, reject) => {
    db.Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      releasedate: req.body.releasedate,
    }).then(createdGame => {
      fs.exists(`${__dirname}/../../src/images/${createdGame.id}_normal.jpg`, (exists) => {
        if (!exists) {
          fs.writeFile(`${__dirname}/../../src/images/${createdGame.id}_normal.jpg`, req.body.imgData.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64', (err) => {
            if (err) {
              reject('failed to save');
            } else {
              resolve(createdGame);
            }
          });
        } else {
          reject('Already existing');
        }
      });
    });
  });
}
