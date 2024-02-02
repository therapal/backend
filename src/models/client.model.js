module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "clients",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      preferenceId: DataTypes.UUID,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imgPath: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      defaultScope: {
        attributes: { exclude: ["password"] }, // Exclude password by default
      },
      scopes: {
        withPassword: {
          attributes: {}, // Include password when using the 'withPassword' scope
        },
      },
    },
  );
};
