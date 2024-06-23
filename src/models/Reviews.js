module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Reviews", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    therapist_id: {
      type: DataTypes.UUID,
      references: {
        model: "Therapists",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    client_id: {
      type: DataTypes.UUID,
      references: {
        model: "Clients",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    rating: DataTypes.INTEGER,
    content: DataTypes.TEXT,
  });
};
