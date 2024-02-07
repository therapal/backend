module.exports = (sequelize, DataTypes) => {
  return sequelize.define('tokens', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    token: DataTypes.STRING,
    type: DataTypes.ENUM('reset_password', 'verify_email', 'refresh_token'),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  })
}
