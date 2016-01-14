export default (sequelize, DataTypes) => {
  const SpecialEdition = sequelize.define('SpecialEdition', {
    price: DataTypes.STRING,
    amount: DataTypes.STRING,
    img_data: DataTypes.TEXT,
  }, {
    classMethods: {
      associate: models => {
        SpecialEdition.hasOne(models.Product);
      }
    }
  });

  return SpecialEdition;
};
