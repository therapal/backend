module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Messages", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    appointment_id: {
      type: DataTypes.UUID,
      references: {
        model: "Appointments",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    sender_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    receiver_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content_type: {
      type: DataTypes.ENUM("image", "text"),
      allowNull: false,
    },
    reply_to_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    read_at: DataTypes.DATE,
    mediaPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    metadata: DataTypes.JSON,
  });
};
