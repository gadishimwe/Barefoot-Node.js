export default (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    requesterId: DataTypes.INTEGER,
    tripId: DataTypes.BIGINT,
    status: DataTypes.STRING,
    lineManagerId: DataTypes.INTEGER
  }, {});
  Request.associate = (models) => {
    Request.belongsTo(models.Users, { foreignKey: 'requesterId', targetKey: 'id' });
    Request.belongsTo(models.Trip, { foreignKey: 'tripId', targetKey: 'tripId' });
  };
  return Request;
};