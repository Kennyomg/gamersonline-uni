export default (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    releasedate: DataTypes.DATE
  }, {
    classMethods: {
      associate: models => {
        Product.belongsToMany(models.Cart, {through: 'ProductCart'});
        Product.belongsToMany(models.Platform, {through: 'ProductPlatform'});
        Product.belongsTo(models.SpecialEdition);
      }
    }
  });

  return Product;
};
