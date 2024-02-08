module.exports = (sequelize, DataTypes) => {
  return sequelize.define("messages", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    appointmentId: {
      type: DataTypes.UUID,
      references: {
        model: "appointments",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    sender: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    receiver: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    mediaType: {
      type: DataTypes.ENUM("image", "none"),
      defaultValue: "none",
    },
    mediaPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
};
