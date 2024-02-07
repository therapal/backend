module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      fullName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM('admin', 'therapist', 'client'),
        allowNull: false
      },
      imgPath: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      defaultScope: {
        attributes: { exclude: ['password'] } // Exclude password by default
      },
      scopes: {
        withPassword: {
          attributes: {} // Include password when using the 'withPassword' scope
        }
      }
    }
  )
}
