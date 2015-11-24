export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: DataTypes.STRING,
    cust_nr: DataTypes.STRING
  }, {
    classMethods: {
      associate: models => {
        Order.belongsToMany(models.Product, {through: 'OrderProduct'});
        Order.belongsTo(models.User);
      }
    }
  });

  return Order;
};
