export default (sequelize, DataTypes) => {
  const Platform = sequelize.define('Platform', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: models => {
        Platform.belongsToMany(models.Product, {through: 'ProductPlatform'});
      }
    }
  });

  return Platform;
};
