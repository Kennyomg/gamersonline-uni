export default (sequelize, DataTypes) => {
  const PhysicalStock = sequelize.define('PhysicalStock', {
    product: DataTypes.STRING,
    amount: DataTypes.STRING,
    product_id: DataTypes.STRING
  }, {
    classMethods: {
      associate: models => {
        PhysicalStock.belongsTo(models.Product);
      }
    }
  });

  return PhysicalStock;
};
