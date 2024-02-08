module.exports = (sequelize, DataTypes) => {
  return sequelize.define("specialisations", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
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
    categoryId: {
      type: DataTypes.UUID,
      references: {
        model: "categories",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
  });
};
