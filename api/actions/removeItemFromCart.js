import db from '../models/index';

export default function removeItemFromCart(req) {
  return new Promise((resolve, reject) => {
    db.Cart.findOrCreate({
      where: {
        UserId: req.body.userId,
      }
    }).spread( (cart) => { // Disable-eslint-line
      db.Product.findOne({
        where: {
          id: req.body.gameId,
        }
      }).then( (product) => {
        cart.removeProduct(product).then( () => {
          cart.getProducts().then( updatedCart => {
            resolve(updatedCart);
          });
        }).catch( reason => {
          reject(reason);
        });
      });
    });
  });
}
