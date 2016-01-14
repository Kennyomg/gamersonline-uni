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
        cart.getProducts({ include: [ db.SpecialEdition ]}).then((products) => {
          let price = 0;
          const cookieNames = [];
          products.map(product => {
            if (product.SpecialEditionId) {
              price += product.SpecialEdition.price;
              cookieNames.push(`${product.name}${product.id}`);
            } else {
              price += parseInt(product.price, 10);
            }
          });
          res.mailer.send('checkout', {
            to: user.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
            subject: `Order ${parseInt(cart.id, 10) + parseInt(products[0].price, 10) + parseInt(products[0].id, 10)}`, // REQUIRED.
            price: price,
            body: (cookieNames.length > 0) ? 'Betaal naar INBAN: NL20INGB0005274592 met uw order nummer als kenmerk. Nadat u dit gedaan heeft zal u een mail ontvangen met de barcode voor uw product' : 'In de bijgeleverde pdf staat een barcode waarmee u in de winkel uw producten kunt ophalen'
          }, (err) => {
            if (err) {
              // handle error
              console.log(err);
              reject(err);
            }
            cart.removeProducts().then( () => {
              resolve({ message: 'Email Sent', cookieNames});
            });
          });
        });
      });
    });
  });
}
