import db from '../models/index';

export default function addItemToCart(req) {
  return new Promise((resolve) => {
    console.log(req.body);
    db.Cart.findOrCreate({
      where: {
        UserId: req.body.user_id,
      }
    }).spread( (cart) => { // Disable-eslint-line
      db.Product.findOne({
        where: {
          id: req.body.id,
        }
      }).then( (product) => {
        cart.addProduct(product).then( updatedCart => {
          return resolve(updatedCart);
        });
      });
    });
  });
}
