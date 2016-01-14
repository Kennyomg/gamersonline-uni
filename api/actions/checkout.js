import db from '../models/index';

export default function checkout(req, res) {
  return new Promise((resolve, reject) => {
    db.User.findOne({
      where: {
        id: req.body.userId,
      }
    }).then((user) => {
      db.Cart.findOne({
        where: {
          UserId: req.body.userId,
        }
      }).then( (cart) => { // Disable-eslint-line
        cart.setProducts(null).then( (products) => {
          let price = 0;
          products.map(product => {
            price += product.price;
          });
          res.mailer.send('checkout', {
            to: user.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
            subject: 'Order', // REQUIRED.
            price: price,
          }, (err) => {
            if (err) {
              // handle error
              console.log(err);
              reject(err);
            }
            cart.removeProducts().then( () => {
              resolve('Email Sent');
            });
          });
        });
      });
    });
  });
}
