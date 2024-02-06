module.exports = (sequelize, DataTypes) => {
  return sequelize.define("profiles", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    therapistId: {
      type: DataTypes.UUID,
      unique: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    gender: DataTypes.ENUM("male", "female", "neutral"),
    /* Sample JSON data -> days: [monday, tues], time: [morning, midDay, evening] */
    availability: DataTypes.JSON,
    ratePerHour: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
};
