import db from '../models/index';

export default function addItemToCart(req) {
  return new Promise((resolve) => {
    console.log(req.session);
    db.Cart.findOrCreate({
      where: {
        UserId: req.body.user.id,
      }
    }).then( () => { // Disable-eslint-line
      db.Cart.findOne({
        where: {
          UserId: req.body.user.id,
        }
      }).then( (cart) => {
        cart.addProduct(db.Product.findOne({
          where: {
            id: req.body.id,
          }
        })).then( updatedCart => {
          return resolve(updatedCart);
        });
      });
    });
  });
}
