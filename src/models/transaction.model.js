module.exports = (sequelize, DataTypes) => {
  return sequelize.define('transactions', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    appointmentId: {
      type: DataTypes.UUID,
      references: {
        model: 'appointments',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    reference: DataTypes.STRING,
    status: DataTypes.ENUM('success', 'pending', 'failed'),
    gatewayResponse: DataTypes.JSON,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  })
}
