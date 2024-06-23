module.exports = (sequelize, DataTypes) => {
  return sequelize.define("TherapistCategories", {
    therapist_id: {
      type: DataTypes.UUID,
      references: {
        model: "Therapists",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    category_id: {
      type: DataTypes.UUID,
      references: {
        model: "Categories",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  });
};
