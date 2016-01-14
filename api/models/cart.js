export default (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {}, {
    classMethods: {
      associate: models => {
        Cart.belongsTo(models.User);
        Cart.belongsToMany(models.Product, {through: 'ProductCart'});
      }
    }
  });

  return Cart;
};
