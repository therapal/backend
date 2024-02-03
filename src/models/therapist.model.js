module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "therapists",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      gender: DataTypes.ENUM("male", "female", "neutral"),
      /* Sample JSON data -> days: [monday, tues], time: [morning, midDay, evening] */
      availability: DataTypes.JSON,
      fullName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      ratePerHour: DataTypes.INTEGER,
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
