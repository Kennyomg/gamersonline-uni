import db from '../models/index';

export default function getCart(req) {
  return new Promise((resolve) => {
    db.Cart.findOne({
      where: {
        UserId: req.body.id,
      }
    }).then(cart => {
      cart.getProducts().then((products) => {
        return resolve(products);
      });
    });
  });
}
