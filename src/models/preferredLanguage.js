module.exports = (sequelize, DataTypes) => {
  return sequelize.define("preferredLanguages", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    languageId: {
      type: DataTypes.UUID,
      references: {
        model: "languages",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    profficiencyLevel: {
      type: DataTypes.ENUM("beginner", "intermediate", "advanced", "fluent"),
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
};
