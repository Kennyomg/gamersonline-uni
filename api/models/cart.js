export default (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {}, {
    classMethods: {
      associate: models => {
        Cart.belongsTo(models.User);
      }
    }
  });

  return Cart;
};
