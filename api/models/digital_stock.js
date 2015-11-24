export default (sequelize, DataTypes) => {
  const DigitalStock = sequelize.define('DigitalStock', {
    product: DataTypes.STRING,
    amount: DataTypes.STRING,
    product_id: DataTypes.STRING
  }, {
    classMethods: {
      associate: models => {
        DigitalStock.belongsTo(models.Product);
      }
    }
  });

  return DigitalStock;
};
