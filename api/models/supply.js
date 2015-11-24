export default (sequelize, DataTypes) => {
  const Supply = sequelize.define('Supply', {
    user: DataTypes.STRING,
    status: DataTypes.STRING,
    date: DataTypes.STRING
  }, {
    classMethods: {
      associate: models => {
        Supply.hasOne(models.PhysicalStock);
        Supply.hasOne(models.DigitalStock);
      }
    }
  });

  return Supply;
};
