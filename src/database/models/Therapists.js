module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Therapists",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      verified_email: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      account_status: {
        type: DataTypes.ENUM("active", "inactive", "blocked"),
        allowNull: false,
        defaultValue: "active",
      },
      rate_per_hour: DataTypes.FLOAT,
      availability: DataTypes.JSON,
      /**
       * {
       *  days: ["sunday", "tuesday"],
       *  time: [morning, mid_day, evening]
       * }
       */
      profile_picture: DataTypes.STRING,
      gender: DataTypes.ENUM("male", "female"),
      country: DataTypes.STRING,
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
      hooks: {
        beforeValidate(model) {
          model.full_name = model.full_name.toLowerCase();
        },
      },
    }
  );
};
