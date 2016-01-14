import db from '../models/index';
import fs from 'fs';

export default function addSpecialEdition(req) {
  return new Promise((resolve, reject) => {
    db.Product.findOne({
      where: {
        id: req.body.gameId,
      }
    }).then( (product) => {
      fs.exists(`${__dirname}/../../src/images/${req.body.gameId}_special.jpg`, (exists) => {
        if (!exists) {
          fs.writeFile(`${__dirname}/../../src/images/${req.body.gameId}_special.jpg`, req.body.imgData.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64', (err) => {
            if (err) {
              reject('failed to save');
            } else {
              db.SpecialEdition.findOrCreate({
                where: {
                  img_data: `${__dirname}/../../src/images/${req.body.gameId}_special.jpg`,
                },
                defaults: {
                  amount: req.body.amount,
                  price: req.body.price,
                }
              }).spread( result => {
                product.update({SpecialEditionId: result.id}).then((newProduct) => {
                  resolve(newProduct);
                });
              });
            }
          });
        } else {
          reject('Already existing');
        }
      });
    });
  });
}
